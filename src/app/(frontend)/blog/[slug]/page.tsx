import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    depth: 2,
  });

  const post = docs[0];
  if (!post) notFound();

  const featuredImage = typeof post.featuredImage === "object" ? post.featuredImage : null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      {featuredImage?.url && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">{post.excerpt}</p>
        )}
        <p className="text-sm text-[var(--muted-foreground)] mt-4">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
          {post.readingTime && ` · ${post.readingTime} min read`}
        </p>
      </header>

      {/* Render rich text content here using your preferred lexical renderer */}
      <div className="prose max-w-none text-[var(--foreground)]">
        <p className="text-[var(--muted-foreground)] italic">
          Rich text content renders here. Install @payloadcms/richtext-lexical/react for rendering.
        </p>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "posts", where: { _status: { equals: "published" } } });
  return docs.map((post) => ({ slug: post.slug }));
}
