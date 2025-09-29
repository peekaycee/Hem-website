"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./components.module.css";
import Image from "next/image";
import Button from "./Button";
import { Livechat } from "../../../public/images";
import { getFuzzyResponse } from "../chatResponses/aiResponses";
import { getLLMResponse } from "../chatResponses/llm"; 

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // add user msg
    setMessages((prev) => [...prev, { text: inputValue, type: "sent" }]);
    setInputValue("");
    setIsUserTyping(false);

    // simulate typing
    setIsBotTyping(true);

    let reply: string;

    // 1️⃣ Fuzzy match first
    const fuzzy = getFuzzyResponse(inputValue);
    if (fuzzy) {
      reply = fuzzy;
    } else {
      // 2️⃣ LLM API fallback
      reply = await getLLMResponse(inputValue);
    }

    setTimeout(() => {
      setIsBotTyping(false);
      setMessages((prev) => [...prev, { text: reply, type: "received" }]);
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

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isUserTyping, isBotTyping]);

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
            <div className={styles.chatHeader}>
              <span>Live Chat</span>
              <p onClick={handleChatBoxOpenAndClose}>✖</p>
            </div>

            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.type === "sent" ? styles.sentText : styles.receivedText}
                >
                  <p>{msg.text}</p>
                </div>
              ))}

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

              <div ref={messagesEndRef} />
            </div>

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

        <Image
          src={Livechat}
          alt="Chat"
          width={45}
          height={45}
          onClick={handleChatBoxOpenAndClose}
        />
      </div>
    </>
  );
}
