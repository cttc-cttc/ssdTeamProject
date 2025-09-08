import { AspectRatio } from "@/components/ui/aspect-ratio";

export function ImageFrame() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="no_image"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </AspectRatio>
  );
}
