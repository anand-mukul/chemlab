import { Button } from "@/components/ui/button";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="h-16 border-t flex items-center justify-between px-6 text-sm text-muted-foreground">
        <div>
          &copy; {new Date().getFullYear()} ChemLab. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Terms
          </Button>
          <Button variant="ghost" size="sm">
            Privacy
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
