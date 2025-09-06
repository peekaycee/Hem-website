"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./components.module.css";
import Image from "next/image";
import Button from "./Button";
import { Instagram } from "../../../public/images"; 

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ text: string; type: "sent" | "received" }[]>([
    { text: "Hi! You there?", type: "received" },
  ]);

  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const handleChatBoxOpenAndClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, type: "sent" }]);
    setInputValue("");
    setIsUserTyping(false);

    // Simulate bot typing before reply
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for reaching out! We'll get back to you.", type: "received" },
      ]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsUserTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsUserTyping(false);
    }, 1000);
  };

  // Jump instantly to bottom when chat opens
  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [isOpen]);

  // Smooth scroll when new messages or typing indicators appear
  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isUserTyping, isBotTyping]);

  // Close chat when clicking outside (but not when clicking the icon)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        chatBoxRef.current &&
        !chatBoxRef.current.contains(target) &&
        !(target as HTMLElement).closest("img[alt='Chat']")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={styles.liveChatBox}>
        {isOpen && (
          <div className={styles.chatBox} ref={chatBoxRef}>
            {/* Header */}
            <div className={styles.chatHeader}>
              <span>Live Chat</span>
              <p onClick={handleChatBoxOpenAndClose}>✖</p>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.type === "sent" ? styles.sentText : styles.receivedText}
                >
                  <p>{msg.text}</p>
                </div>
              ))}

              {/* Typing Indicators */}
              {isUserTyping && (
                <div className={styles.sentText}>
                  <div className={styles.typingBubble}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              {isBotTyping && (
                <div className={styles.receivedText}>
                  <div className={styles.typingBubble}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}

              {/* Invisible marker to scroll into view */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputVal}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
              />
              <Button tag={"Send"} onClick={handleSendMessage} />
            </div>
          </div>
        )}

        {/* Floating Icon */}
        <Image
          src={Instagram}
          alt="Chat"
          width={45}
          height={45}
          onClick={handleChatBoxOpenAndClose}
        />
      </div>
    </>
  );
}
