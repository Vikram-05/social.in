import React, { useState, useRef, useEffect } from 'react'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Chats() {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const [activeChat, setActiveChat] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample chats data
    const [chats, setChats] = useState([
        {
            id: 1,
            userId: 'emma_watson',
            userName: 'Emma Watson',
            userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            lastMessage: 'Thanks for the advice! 🙏',
            timestamp: '2m ago',
            unread: 3,
            isOnline: true,
            messages: [
                { id: 1, text: 'Hey there! How are you?', sender: 'them', timestamp: '10:30 AM' },
                { id: 2, text: 'Im doing great! Just finished my project', sender: 'me', timestamp: '10:31 AM' },
                { id: 3, text: 'Thats awesome! What was it about?', sender: 'them', timestamp: '10:32 AM' },
                { id: 4, text: 'It was about sustainable fashion design', sender: 'me', timestamp: '10:33 AM' },
                { id: 5, text: 'Sounds interesting! Ive been getting into that too', sender: 'them', timestamp: '10:35 AM' },
                { id: 6, text: 'We should collaborate sometime!', sender: 'them', timestamp: '10:36 AM' },
                { id: 7, text: 'Definitely! Lets connect next week', sender: 'me', timestamp: '10:37 AM' },
                { id: 8, text: 'Thanks for the advice! 🙏', sender: 'them', timestamp: '2m ago' },
            ]
        },
        {
            id: 2,
            userId: 'robertdowneyjr',
            userName: 'Robert Downey Jr.',
            userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            lastMessage: 'See you at the event tomorrow!',
            timestamp: '1h ago',
            unread: 0,
            isOnline: false,
            messages: [
                { id: 1, text: 'Hey Tony! Ready for the event?', sender: 'me', timestamp: 'Yesterday' },
                { id: 2, text: 'Absolutely! Cant wait to see everyone', sender: 'them', timestamp: 'Yesterday' },
                { id: 3, text: 'Dont forget the special surprise', sender: 'them', timestamp: 'Yesterday' },
                { id: 4, text: 'See you at the event tomorrow!', sender: 'them', timestamp: '1h ago' },
            ]
        },
        {
            id: 3,
            userId: 'zendaya',
            userName: 'Zendaya',
            userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            lastMessage: 'Love the new photos! 📸',
            timestamp: '3h ago',
            unread: 1,
            isOnline: true,
            messages: [
                { id: 1, text: 'Just posted some new shots from the shoot', sender: 'me', timestamp: '4h ago' },
                { id: 2, text: 'Love the new photos! 📸', sender: 'them', timestamp: '3h ago' },
            ]
        },
        {
            id: 4,
            userId: 'taylor_swift',
            userName: 'Taylor Swift',
            userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
            lastMessage: 'Listening to your playlist now 🎵',
            timestamp: '5h ago',
            unread: 0,
            isOnline: false,
            messages: [
                { id: 1, text: 'Check out my new playlist!', sender: 'me', timestamp: '6h ago' },
                { id: 2, text: 'Listening to your playlist now 🎵', sender: 'them', timestamp: '5h ago' },
            ]
        },
        {
            id: 5,
            userId: 'cristiano',
            userName: 'Cristiano Ronaldo',
            userImage: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=100&h=100&fit=crop',
            lastMessage: 'Siuuuu! ⚽',
            timestamp: '1d ago',
            unread: 0,
            isOnline: true,
            messages: [
                { id: 1, text: 'Great game yesterday!', sender: 'me', timestamp: '1d ago' },
                { id: 2, text: 'Siuuuu! ⚽', sender: 'them', timestamp: '1d ago' },
            ]
        }
    ]);

    // Filtered chats based on search
    const filteredChats = chats.filter(chat => 
        chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat?.messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageText.trim() && activeChat) {
            const newMessage = {
                id: activeChat.messages.length + 1,
                text: messageText,
                sender: 'me',
                timestamp: 'Just now'
            };

            setChats(prevChats => 
                prevChats.map(chat => 
                    chat.id === activeChat.id 
                        ? { 
                            ...chat, 
                            messages: [...chat.messages, newMessage],
                            lastMessage: messageText,
                            timestamp: 'Just now'
                          } 
                        : chat
                )
            );

            setMessageText('');
            scrollToBottom();
        }
    };

    const markAsRead = (chatId) => {
        setChats(prevChats => 
            prevChats.map(chat => 
                chat.id === chatId ? { ...chat, unread: 0 } : chat
            )
        );
    };

    const formatTime = (timestamp) => {
        return timestamp;
    };

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Chats List Sidebar */}
            <div className={`w-full md:w-96 border-r flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`} style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {/* Header */}
                <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <button 
                            onClick={() => navigate(-1)}
                            style={{ color: 'var(--text-color)' }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold">Messages</h1>
                        <button style={{ color: 'var(--button-color)' }}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5" style={{ color: 'var(--semi-text-light-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                            style={{ 
                                backgroundColor: 'var(--semi-text-light-color)', 
                                color: 'var(--text-color)',
                                border: 'none',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Chats List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`p-4 border-b cursor-pointer transition-colors hover:bg-opacity-10 ${
                                activeChat?.id === chat.id ? 'bg-[var(--button-color)] bg-opacity-20' : 'hover:bg-[var(--semi-text-light-color)]'
                            }`}
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                            onClick={() => {
                                setActiveChat(chat);
                                markAsRead(chat.id);
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                {/* User Avatar with Online Status */}
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img 
                                            src={chat.userImage} 
                                            alt={chat.userName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {chat.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--bg-color)', backgroundColor: 'var(--button-color)' }}></div>
                                    )}
                                </div>

                                {/* Chat Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm truncate">{chat.userName}</h3>
                                        <span className="text-xs" style={{ color: 'var(--semi-text-color)' }}>
                                            {chat.timestamp}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm truncate" style={{ color: 'var(--semi-text-color)' }}>
                                            {chat.lastMessage}
                                        </p>
                                        {chat.unread > 0 && (
                                            <span 
                                                className="flex-shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                                                style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}
                                            >
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Messages Area */}
            <div className={`flex-1 flex flex-col ${activeChat ? 'flex' : 'hidden md:flex'}`}>
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <div className="flex items-center space-x-3">
                                <button 
                                    onClick={() => setActiveChat(null)}
                                    className="md:hidden"
                                    style={{ color: 'var(--text-color)' }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img 
                                        src={activeChat.userImage} 
                                        alt={activeChat.userName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold">{activeChat.userName}</h2>
                                    <p className="text-xs" style={{ color: 'var(--semi-text-color)' }}>
                                        {activeChat.isOnline ? 'Online' : 'Last seen recently'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button style={{ color: 'var(--text-color)' }}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </button>
                                <button style={{ color: 'var(--text-color)' }}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <button style={{ color: 'var(--text-color)' }}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeChat.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                        message.sender === 'me' 
                                            ? 'rounded-br-none' 
                                            : 'rounded-bl-none'
                                    }`}
                                    style={{
                                        backgroundColor: message.sender === 'me' 
                                            ? 'var(--button-color)' 
                                            : 'var(--semi-text-light-color)',
                                        color: message.sender === 'me' 
                                            ? 'var(--bg-color)' 
                                            : 'var(--button-color)'
                                    }}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <div className={`text-xs mt-1 ${
                                            message.sender === 'me' 
                                                ? 'text-[var(--bg-color)] text-opacity-70' 
                                                : 'text-[var(--bg-color)]'
                                        }`}>
                                            {formatTime(message.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                                <button type="button" style={{ color: 'var(--semi-text-color)' }}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                                <button type="button" style={{ color: 'var(--semi-text-color)' }}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Message..."
                                    className="flex-1 px-4 py-2 rounded-full text-sm"
                                    style={{ 
                                        backgroundColor: 'var(--semi-text-light-color)', 
                                        color: 'var(--text-color)',
                                        border: 'none',
                                        outline: 'none'
                                    }}
                                />
                                <button 
                                    type="submit"
                                    style={{ 
                                        color: messageText.trim() ? 'var(--button-color)' : 'var(--semi-text-light-color)',
                                        cursor: messageText.trim() ? 'pointer' : 'not-allowed'
                                    }}
                                    disabled={!messageText.trim()}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    // Empty State when no chat is selected
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--semi-text-light-color)' }}>
                            <svg className="w-12 h-12" style={{ color: 'var(--semi-text-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                        <p className="text-sm mb-4" style={{ color: 'var(--semi-text-color)' }}>
                            Send private messages to a friend or group.
                        </p>
                        <button 
                            className="px-6 py-2 rounded-lg font-semibold"
                            style={{ backgroundColor: 'var(--button-color)', color: 'var(--bg-color)' }}
                        >
                            Send Message
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Chats