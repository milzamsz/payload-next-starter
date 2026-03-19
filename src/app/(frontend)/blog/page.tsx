import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-bold text-[var(--foreground)] mb-4">Blog</h1>
      <p className="text-[var(--muted-foreground)] text-lg mb-16">
        Latest articles and updates.
      </p>

      {posts.length === 0 && (
        <p className="text-[var(--muted-foreground)]">No posts yet. Create your first post in the CMS.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const featuredImage = typeof post.featuredImage === "object" ? post.featuredImage : null;
          return (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {featuredImage?.url && (
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={featuredImage.url}
                      alt={featuredImage.alt ?? post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[var(--muted-foreground)] text-sm line-clamp-3">{post.excerpt}</p>
                  )}
                  <p className="text-xs text-[var(--muted-foreground)] mt-4">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
