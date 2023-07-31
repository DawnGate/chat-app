import { textColor } from '@/config/colors';
import { captionTypo } from '@/config/typography';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

function ContentBox({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon?: JSX.Element;
  title: string;
}) {
  return (
    <Box>
      <Box display="flex" gap={1} alignItems="center">
        {icon}
        <Typography
          variant="caption"
          textTransform="uppercase"
          sx={{
            ...captionTypo,
            fontWeight: 500,
            color: textColor.lighter,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box mt={1}>{children}</Box>
    </Box>
  );
}

export default ContentBox;
