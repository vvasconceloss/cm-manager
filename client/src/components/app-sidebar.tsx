import * as React from "react"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  versions: ["1.0.0"],
  navMain: [
    {
      title: "Principal",
      url: "/",
      items: [
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Inbox",
          url: "#",
        },
        {
          title: "Squad",
          url: "#",
        },
      ],
    },
    {
      title: "Season",
      url: "#",
      items: [
        {
          title: "Schedule",
          url: "#",
        },
        {
          title: "Competitions",
          url: "#",
        }
      ],
    },
    {
      title: "Business",
      url: "#",
      items: [
        {
          title: "Transfers",
          url: "#",
        },
        {
          title: "Scouting",
          url: "#",
        },
      ],
    },
    {
      title: "Club",
      url: "#",
      items: [
        {
          title: "Information",
          url: "#",
        },
        {
          title: "Finances",
          url: "#",
        },
        {
          title: "Youth Academy",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-text_two select-none">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="select-none text-text_one border-2 border-transparent transition-all ease-linear hover:rounded-md hover:bg-background hover:border-text_primary hover:text-text_primary">
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}