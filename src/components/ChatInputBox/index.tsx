'use client';

// icons
import { Send } from 'react-feather';
// hooks
import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';

// mui
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';

import { borderRadius } from '@/config/border';
import { primaryColor, textColor, whiteDefaultColor } from '@/config/colors';
import { textTypo } from '@/config/typography';

const MAX_CHAT_BOX_HEIGHT = 200;

function ChatInput() {
  // store
  const [sendTextMessage, setSendTextMessage] = useState<string>('');
  // ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // state
  const [inputText, setInputText] = useState<string>('');
  // local variable
  const trimmedText = inputText.trim();

  // event
  const handleSubmit = () => {
    if (!trimmedText) return;
    if (sendTextMessage) {
      setSendTextMessage(inputText);
    }
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setInputText((prev) => `${prev}\t`);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.overflowY = 'hidden';
      textareaRef.current.style.maxHeight = `${MAX_CHAT_BOX_HEIGHT}px`;
      textareaRef.current.style.height = 'auto';
      if (textareaRef.current.scrollHeight >= MAX_CHAT_BOX_HEIGHT) {
        textareaRef.current.style.overflowY = 'scroll';
      }
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // effect
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  // render
  return (
    <Box
      display="flex"
      sx={{
        width: '100%',
        minHeight: 40,
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <TextareaAutosize
        ref={textareaRef}
        value={inputText}
        placeholder="Enter message"
        className="custom-scrollbar"
        style={{
          height: 24,
          resize: 'none',
          borderRadius: borderRadius.big,
          border: 'none',
          outline: 'none',
          width: '100%',
          paddingRight: 48,
          paddingLeft: 0,
          paddingTop: 8,
          paddingBottom: 8,
          fontSize: textTypo.medium,
          color: textColor.normal,
        }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        // rows={1}
      />
      <IconButton
        onClick={handleSubmit}
        disabled={!trimmedText}
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          background: whiteDefaultColor,
          outline: '1px solid',
          outlineOffset: '-1px',
          outlineColor: primaryColor.dark,
          color: primaryColor.dark,
          ':hover': {
            background: primaryColor.dark,
            color: whiteDefaultColor,
          },
          ':disabled': {
            outlineColor: whiteDefaultColor,
          },
        }}
      >
        <Send size="24" />
      </IconButton>
    </Box>
  );
}

export default ChatInput;
