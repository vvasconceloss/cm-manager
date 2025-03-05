import { SidebarTrigger } from "./ui/sidebar"
import { Separator } from "@radix-ui/react-separator"

export const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 text-text_one hover:text-text_primary hover:bg-background" />
      <Separator orientation="vertical" className="mr-2 h-4" />
    </header>
  )
}