'use client';

// icons
import { Send } from 'react-feather';
// hooks
import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';

// mui
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';

// config styles
import { borderRadius } from '@/config/border';
import { primaryColor, textColor, whiteDefaultColor } from '@/config/colors';
import { textTypo } from '@/config/typography';
import { useParams } from 'next/navigation';

const MAX_CHAT_BOX_HEIGHT = 200;

const sendTextMessage = (messageText: string, chatId: string) => {
  const bodyData = {
    messageText,
    chatId,
  };
  fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify(bodyData),
  });
};

function ChatInput() {
  // pathname
  const params = useParams();
  const { id: chatId } = params;
  // ref
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // state
  const [inputText, setInputText] = useState<string>('');
  // local variable
  const trimmedText = inputText.trim();

  // event
  const handleSubmit = () => {
    if (!trimmedText) return;
    // send message to server
    sendTextMessage(trimmedText, chatId);
    // reset input text
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
        ref={(ref: HTMLTextAreaElement) => {
          if (ref) {
            textareaRef.current = ref;
            ref.focus();
          }
        }}
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
          background: 'transparent',
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
