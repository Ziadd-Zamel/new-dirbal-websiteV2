import { getAllCategoriesServer } from "@/lib/api/category.api";
import Navbar from "./_components/Navbar";
interface NavbarProps {
  selectedIndex: number;
}

export default async function Header({ selectedIndex }: NavbarProps) {
  const data = await getAllCategoriesServer();
  return <Navbar selectedIndex={selectedIndex} categories={data.data} />;
}
