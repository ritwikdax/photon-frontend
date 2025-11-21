'use client';

import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface CopyUrlTextProps {
  text: string;
  label?: string;
  showLabel?: boolean;
}

export default function CopyUrlText({ 
  text, 
  label = 'Copy URL',
  showLabel = true 
}: CopyUrlTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: 1,
        padding: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'action.hover',
        maxWidth: '100%',
        minWidth: 0,
        width: '100%'
      }}
    >
      {showLabel && (
        <Typography 
          variant="body2" 
          sx={{ 
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            flex: 1,
            minWidth: 0
          }}
        >
          {text}
        </Typography>
      )}
      
      <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
        <IconButton 
          size="small" 
          onClick={handleCopy}
          sx={{ 
            padding: 0.5,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          {copied ? (
            <CheckIcon fontSize="small" color="success" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
