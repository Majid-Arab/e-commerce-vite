import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";

export default function Layout() {
  return (
    <AppShell
      padding="md"
      header={{ height: 30 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
    >
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main p={0}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
