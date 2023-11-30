import { KeyboardArrowDown } from "@material-ui/icons";
import { Button, Menu, MenuItem, useTheme } from "@mui/material";
import React, { CSSProperties, useCallback, useRef } from "react";

export type TMenuItem = {
  title: string;
  visible: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  subMenus?: TMenuItem[];
};

export const DropdownMenuItem = ({
  menuItem,
  menuShowingDropdown,
  setMenuShowingDropdown
}: {
  menuItem: TMenuItem;
  menuShowingDropdown: string;
  setMenuShowingDropdown: (menuTitle: string) => void;
}) => {
  const { title, subMenus, style } = menuItem;
  const buttonRef = useRef<null | HTMLButtonElement>(null);

  const showSubMenu = useCallback(() => {
    setMenuShowingDropdown(menuItem.title);
  }, [menuItem.title, setMenuShowingDropdown]);

  const closeSubMenu = useCallback(() => {
    setMenuShowingDropdown("");
  }, [setMenuShowingDropdown]);

  const subMenusNodes = subMenus?.map((subMenuItem) => {
    return (
      <>
        {subMenuItem.visible &&
          <MenuItem
            onClick={subMenuItem.onClick}
            key={subMenuItem.title}
          >
            {subMenuItem.title}
          </MenuItem>
        }
      </>
    );
  });

  const theme = useTheme();

  return (
    <>
      {menuItem.visible &&
        <>
          <Button
            id={`menuItem-${title}`}
            sx={{ zIndex: theme.zIndex.modal + 1 }}
            ref={buttonRef}
            onClick={() => {
              if (!menuItem.subMenus) {
                menuItem?.onClick && menuItem.onClick();
              }
            }}
            onMouseLeave={() => {
              setMenuShowingDropdown("");
            }}
            onMouseEnter={() => {
              if (menuItem.subMenus) {
                showSubMenu();
                return;
              }
            }}
            style={style}
          >
            {title} {menuItem.subMenus ? <KeyboardArrowDown /> : ""}
          </Button>
          <Menu
            PaperProps={{
              onMouseEnter: () => {
                showSubMenu();
              },
              onMouseLeave: () => {
                closeSubMenu();
              }
            }}
            anchorEl={buttonRef.current}
            open={menuShowingDropdown === menuItem.title}
            onClose={closeSubMenu}
          >
            {subMenusNodes}
          </Menu>
        </>
      }
    </>
  );
};