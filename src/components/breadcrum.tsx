"use client";

import React from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; 
import { BreadcrumbItem } from "@/components/ui/breadcrumb"; 
import {  ChevronRight } from "lucide-react";

interface BreadcrumbProps {
}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
  const pathname = usePathname(); 
  const pathnames = pathname.split('/').filter(x => x && !/^\d+$/.test(x)); // Filter out parameter IDs
  const fullPathnames = ['Home', ...pathnames.filter(value => !/^\d+$/.test(value))]; // Filter out numeric IDs

  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList >
        {fullPathnames.map((value, index) => {
          const href = `/${fullPathnames.slice(1, index + 1).join('/')}`; // Adjust href to skip 'Home'
          const displayValue = /^\d+$/.test(value) ? '' : value; // Skip displaying IDs
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-white capitalize" href={href}>{displayValue.replace(/\s+/g, "-")}</BreadcrumbLink>
              </BreadcrumbItem>
              {index < fullPathnames.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};

export default Breadcrumb;