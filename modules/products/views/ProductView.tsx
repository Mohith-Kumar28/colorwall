"use client";

import { formatCurrency, generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";

import dynamic from "next/dynamic";

import { CheckCheckIcon, LinkIcon, PaletteIcon, StarIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { toast } from "sonner";
import StarRating from "@/components/star-rating/StarRating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CartButton = dynamic(() => import("../components/CartButton"), {
  ssr: false,
  loading: () => (
    <Button
      disabled
      className="flex-1 bg-pink-400"
      variant="elevated"
      aria-label="Loading cart button"
    >
      Loading...
    </Button>
  ),
});

interface Props {
  productId: string;
  tenantSlug: string;
}

const ProductView = ({ productId, tenantSlug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  const [isCopied, setIsCopied] = useState(false);

  // Use cover if available, otherwise use product image with blur for background
  const backgroundImage = data.cover?.url || data.image?.url || "/placeholder.png";
  const productImage = data.image?.url || "/placeholder.png";
  const hasCover = Boolean(data.cover?.url);

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden">
        {/* Blurred background banner - smaller when no cover */}
        <div className={`relative ${hasCover ? "aspect-[5/1]" : "h-24"} border-b overflow-hidden`}>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${!hasCover ? "blur-2xl scale-125 opacity-70" : ""}`}
            priority
          />
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left: Product Image */}
          <div className="lg:col-span-1 p-6 flex items-start justify-center border-b lg:border-b-0 lg:border-r">
            <div className="relative aspect-[3/4] w-full max-w-sm bg-neutral-50 rounded-lg overflow-hidden border shadow-sm">
              <Image
                src={productImage}
                alt={data.image?.alt || data.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right: Product Details */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Title */}
            <div className="p-6 border-b">
              <h1 className="text-3xl lg:text-4xl font-medium">{data.name}</h1>
            </div>
            
            {/* Price + Add to Cart row */}
            <div className="flex flex-wrap items-center gap-4 p-6 border-b">
              <div className="px-4 py-2 border-2 border-black bg-pink-400">
                <p className="text-lg font-bold">{formatCurrency(data.price)}</p>
              </div>
              
              <CartButton
                isPurchased={data.isPurchased}
                tenantSlug={tenantSlug}
                productId={productId}
              />
              <Button
                variant="elevated"
                className="size-12"
                disabled={isCopied}
                aria-label="Copy product link"
                title="Copy product link"
                onClick={() => {
                  setIsCopied(true);
                  const url =
                    typeof window !== "undefined"
                      ? window.location.href
                      : "";
                  if (!url) return;
                  navigator.clipboard
                    ?.writeText(url)
                    .then(() => {
                      toast.success("Link copied to clipboard");
                    })
                    .catch(() => {
                      console.warn("Failed to copy link");
                    });
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 1000);
                }}
              >
                {isCopied ? <CheckCheckIcon /> : <LinkIcon />}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                {data.refundPolicy === "no-refunds"
                  ? "No refunds"
                  : `${data.refundPolicy} money back guarantee`}
              </p>
            </div>
            
            {/* Artist row */}
            <div className="flex flex-wrap items-center gap-4 p-6 border-b">
              <Link
                href={generateTenantUrl(tenantSlug)}
                className="flex items-center gap-3 px-4 py-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
              >
                <PaletteIcon className="size-5 text-muted-foreground" />
                {data.tenant.image?.url && (
                  <Image
                    src={data.tenant.image.url}
                    alt={data.tenant.name}
                    width={28}
                    height={28}
                    className="rounded-full border-2 shrink-0 size-7 object-cover"
                  />
                )}
                <span className="text-base font-semibold">by {data.tenant.name}</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <StarRating rating={data.reviewRating} />
                <p className="text-sm font-medium text-muted-foreground">
                  {data.reviewCount} ratings
                </p>
              </div>
            </div>
            
            {/* Description */}
            <div className="p-6 border-b flex-1">
              {data.description ? (
                <RichText data={data.description} />
              ) : (
                <p className="font-medium text-muted-foreground italic">
                  No description available
                </p>
              )}
            </div>
            
            {/* Ratings breakdown */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Ratings</h3>
                <div className="flex items-center gap-1 text-sm">
                  <StarIcon className="size-4 fill-black" />
                  <span>({data.reviewRating})</span>
                  <span className="text-muted-foreground">{data.reviewCount} ratings</span>
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] gap-2 text-sm">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <Fragment key={stars}>
                    <div className="font-medium">
                      {stars} {stars === 1 ? "star" : "stars"}
                    </div>
                    <Progress
                      value={data.ratingDistribution[stars]}
                      className="h-5"
                    />
                    <div className="font-medium text-muted-foreground">
                      {data.ratingDistribution[stars]}%
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

export const ProductViewSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={"/placeholder.png"}
            alt={"Placeholder"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};
