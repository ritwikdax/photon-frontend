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
        alignItems: 'center', 
        gap: 1,
        padding: 1,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        backgroundColor: '#f5f5f5',
        maxWidth: 'fit-content'
      }}
    >
      {showLabel && (
        <Typography 
          variant="body2" 
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1
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
