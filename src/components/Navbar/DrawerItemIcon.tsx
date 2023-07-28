import { ReactNode } from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

type Color =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'error'
  | 'success';

function DrawerItemIcon({
  children,
  color = 'primary',
  selected = false,
  href,
}: {
  children: ReactNode;
  color?: Color;
  selected?: boolean;
  href?: string;
}) {
  return (
    <ListItemButton
      selected={selected}
      href={href ?? ''}
      sx={(theme) => ({
        ...(color && {
          color: theme.palette[color].main,
        }),
        borderRadius: 1,
        justifyContent: 'center',
        marginX: 1,
        marginBottom: 1,
        ...(selected && {
          '& svg': {
            color: theme.palette[color].main,
          },
        }),
      })}
    >
      <ListItemIcon sx={{ minWidth: 0 }}>{children}</ListItemIcon>
    </ListItemButton>
  );
}

export default DrawerItemIcon;
