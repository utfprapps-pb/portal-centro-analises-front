import { DropdownMenuItem, TMenuItem } from "@/components/dropdown-menu/DropdownMenuItem";
import React, { useCallback, useState } from "react";

export interface DropdownMenuProps {
  items: TMenuItem[];
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const [menuShowingDropdown, setMenuShowingDropdown] = useState("");

  const handleMenuShowingDropdownChange = useCallback((menuTitle: string) => {
    setMenuShowingDropdown(menuTitle);
  }, []);

  const menuItems = props.items.map((menuItem) => {
    return (
      <>
        {menuItem.visible &&
          <DropdownMenuItem
            key={menuItem.title}
            menuItem={menuItem}
            menuShowingDropdown={menuShowingDropdown}
            setMenuShowingDropdown={handleMenuShowingDropdownChange}
          />
        }
      </>
    );
  });

  return <>{menuItems}</>;
};
