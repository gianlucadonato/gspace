import { Input } from "@/components/ui/input"
import { ChangeEventHandler } from "react"

export function Search({ onChange }: { onChange?: ChangeEventHandler }) {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={onChange}
      />
    </div>
  )
}