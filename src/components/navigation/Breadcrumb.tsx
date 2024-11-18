import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavigationProps {
  items: {
    label: string;
    href: string;
    current?: boolean;
  }[];
}

const BreadcrumbNavigation = ({ items }: BreadcrumbNavigationProps) => {
  return (
    <div className="bg-neutral-800/50 border-b border-white/10">
      <div className="container mx-auto">
        <Breadcrumb className="px-4 py-3 text-sm">
          {items.map((item, index) => (
            <BreadcrumbItem key={index} className="flex items-center">
              <BreadcrumbLink asChild>
                <Link
                  to={item.href}
                  className={`hover:text-primary transition-colors ${
                    item.current ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {item.label}
                </Link>
              </BreadcrumbLink>
              {index < items.length - 1 && (
                <BreadcrumbSeparator className="text-neutral-600 flex items-center" />
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;