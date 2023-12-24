import Image from "next/image";
import EmptyImage from "@/public/empty.svg";

export function EmptySection() {
  return (
    <section className="py-4 overflow-hidden">
      <div className="container p-4">
        <div className="max-w-md mx-auto text-center">
          <Image width="120" className="p-4 mx-auto" src={EmptyImage} alt="empty image" />
          <h2 className="font-heading mb-3 text-2xl font-semibold">It&apos;s a bit empty here</h2>
          <p className="mb-7 text-neutral-500">No Data :&#x28;</p>
        </div>
      </div>
    </section>
  )
}