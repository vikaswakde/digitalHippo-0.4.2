import PaymentStatus from "@/components/PaymentStatus";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ThankYouPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
  const orderId = searchParams.orderId;

  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const products = order.products as Product[];

  const orderTotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 lg:max-w-4xl xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-500">
              Order Successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </h1>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order was processed and your assets are available to
                download below. We&apos;ve sent you receipt and order details to{" "}
                {typeof order.user !== "string" ? (
                  <span className="font-medium text-gray-900">
                    {order.user.email}
                  </span>
                ) : null}
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                We appreciate your order, and we&apos;re currently processing
                it. So hand tight and we&apos;ll send you confirmation very
                soon!
              </p>
            )}
            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order nr.</div>
              <div className="mt-2 text-gray-900">{order.id}</div>

              <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
                {(order.products as Product[]).map((product) => {
                  const { image } = product.images[0];

                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) => value === product.category
                  )?.label;

                  const downloadUrl = (product.product_files as ProductFile)
                    .url as string;

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            fill
                            src={image.url}
                            alt={`${product.name} image`}
                            className="flex-none rounded-md bg-gray-100 object-cover object-center"
                          />
                        ) : null}
                      </div>

                      <div className="flex-auto flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3>{product.name}</h3>
                          <p>Category: {label}</p>
                        </div>

                        {order._isPaid ? (
                          <a
                            href={downloadUrl}
                            download={product.name}
                            className="text-blue-600 hover:underline underline-offset-2"
                          >
                            Download asset
                          </a>
                        ) : null}
                      </div>

                      <p className="flex-none font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatPrice(orderTotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p>{formatPrice(10)}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">Total</p>
                  <p className="text-base">{formatPrice(orderTotal + 10)}</p>
                </div>
              </div>
            </div>
            <PaymentStatus
              orderEmail={(order.user as User).email}
              isPaid={order._isPaid}
              orderId={order.id}
            />
            <div className="mt-16 border-t border-gray-200 py-6 text-blue-600 hover:text-blue-500">
              <Link
                href="/products"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Continue shopping &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
