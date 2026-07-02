import React, { useState } from 'react';

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sneha",
      handle: "@sneha58368",
      time: "12m ago",
      content: "Day 15 Project Complete! Rebuilding ConnectHub social platform with clean state architecture and fully optimized production build configuration. Everything works perfectly!",
      likes: 42,
      comments: 7,
      isLiked: false
    },
    {
      id: 2,
      author: "Developer",
      handle: "@dev_assistant",
      time: "1h ago",
      content: "Modern responsive grid frameworks allow social feeds to render beautifully across all screen dimensions, especially on mobile devices.",
      likes: 128,
      comments: 24,
      isLiked: true
    }
  ]);

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.topHeader}>
        <h1 style={styles.logoText}>ConnectHub</h1>
      </header>

      <div style={styles.mainLayout}>
        <main style={styles.feedStream}>
          <div style={styles.createPostBox}>
            <div style={styles.avatarPlaceholder}></div>
            <div style={styles.inputWrapper}>
              <textarea placeholder="What's happening?" style={styles.postInput}></textarea>
              <button style={styles.postButton}>Post</button>
            </div>
          </div>

          {posts.map(post => (
            <div key={post.id} style={styles.postCard}>
              <div style={{...styles.avatarPlaceholder, backgroundColor: '#1d9bf0'}}></div>
              <div style={styles.postContent}>
                <div style={styles.postHeader}>
                  <span style={styles.authorName}>{post.author}</span>
                  <span style={styles.authorHandle}>{post.handle}</span>
                  <span style={styles.dot}>·</span>
                  <span style={styles.postTime}>{post.time}</span>
                </div>
                <p style={styles.postBodyText}>{post.content}</p>
                
                <div style={styles.actionGroup}>
                  <div style={styles.actionItem}>
                    💬 <span style={styles.actionCount}>{post.comments}</span>
                  </div>
                  <div 
                    style={{...styles.actionItem, color: post.isLiked ? '#f91880' : '#536471'}} 
                    onClick={() => handleLike(post.id)}
                  >
                    {post.isLiked ? '❤️' : '🖤'} <span style={styles.actionCount}>{post.likes}</span>
                  </div>
                  <div style={styles.actionItem}>📤</div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <nav style={styles.bottomNav}>
        <div style={styles.navLinkActive}>🏠</div>
        <div style={styles.navLink}>🔍</div>
        <div style={styles.navLink}>🔔</div>
        <div style={styles.navLink}>✉️</div>
      </nav>
    </div>
  );
}

const styles = {
  appContainer: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  topHeader: {
    position: 'sticky',
    top: 0,
    height: '53px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    borderBottom: '1px solid #eff3f4',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
  },
  logoText: {
    fontSize: '19px',
    fontWeight: '800',
    color: '#0f1419',
    margin: 0,
  },
  mainLayout: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: '60px',
  },
  feedStream: {
    width: '100%',
    maxWidth: '600px',
    borderRight: '1px solid #eff3f4',
    borderLeft: '1px solid #eff3f4',
  },
  createPostBox: {
    display: 'flex',
    padding: '16px',
    borderBottom: '1px solid #eff3f4',
  },
  avatarPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#cfd9de',
    marginRight: '12px',
    flexShrink: 0,
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  postInput: {
    width: '100%',
    border: 'none',
    resize: 'none',
    fontSize: '18px',
    outline: 'none',
    color: '#0f1419',
    marginBottom: '12px',
    fontFamily: 'inherit',
  },
  postButton: {
    backgroundColor: '#1d9bf0',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '9999px',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
  },
  postCard: {
    display: 'flex',
    padding: '16px',
    borderBottom: '1px solid #eff3f4',
    cursor: 'pointer',
  },
  postContent: {
    flex: 1,
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '4px',
  },
  authorName: {
    fontWeight: '700',
    color: '#0f1419',
    marginRight: '4px',
    fontSize: '15px',
  },
  authorHandle: {
    color: '#536471',
    fontSize: '15px',
    marginRight: '4px',
  },
  dot: {
    color: '#536471',
    marginRight: '4px',
  },
  postTime: {
    color: '#536471',
    fontSize: '15px',
  },
  postBodyText: {
    fontSize: '15px',
    lineHeight: '20px',
    color: '#0f1419',
    margin: '0 0 12px 0',
    wordBreak: 'break-word',
  },
  actionGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '400px',
    color: '#536471',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    cursor: 'pointer',
  },
  actionCount: {
    marginLeft: '6px',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '53px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #eff3f4',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  navLink: {
    fontSize: '22px',
    cursor: 'pointer',
    opacity: 0.6,
  },
  navLinkActive: {
    fontSize: '22px',
    cursor: 'pointer',
    opacity: 1,
  }
};
                    
