import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonBadge,
  IonAvatar,
  IonText
} from '@ionic/react';
import {
  logoDiscord,
  logoTwitter,
  logoLinkedin,
  globe,
  mail,
  chatbubbles,
  people,
  newspaper,
  calendar,
  share,
  heart,
  star,
  chevronForward,
  openOutline
} from 'ionicons/icons';
import './Social.css';

interface SocialLink {
  id: number;
  name: string;
  description: string;
  icon: string;
  url: string;
  color: string;
  members?: number;
  isActive: boolean;
  type: 'primary' | 'secondary';
}

interface CommunityStats {
  totalMembers: number;
  activeDiscussions: number;
  monthlyEvents: number;
  resourcesShared: number;
}

const Social: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      id: 1,
      name: "Discord Server",
      description: "Join our active community chat and real-time discussions",
      icon: logoDiscord,
      url: "https://discord.gg/seckc",
      color: "discord",
      members: 450,
      isActive: true,
      type: "primary"
    },
    {
      id: 2,
      name: "Twitter",
      description: "Follow us for security news, event updates, and community highlights",
      icon: logoTwitter,
      url: "https://twitter.com/seckc",
      color: "twitter",
      members: 1200,
      isActive: true,
      type: "primary"
    },
    {
      id: 3,
      name: "LinkedIn Group",
      description: "Professional networking and career opportunities in cybersecurity",
      icon: logoLinkedin,
      url: "https://linkedin.com/company/seckc",
      color: "linkedin",
      members: 800,
      isActive: true,
      type: "primary"
    },
    {
      id: 4,
      name: "Official Website",
      description: "Visit our main website for detailed information and resources",
      icon: globe,
      url: "https://seckc.org",
      color: "primary",
      isActive: true,
      type: "secondary"
    },
    {
      id: 5,
      name: "Newsletter",
      description: "Subscribe to our monthly newsletter for curated security content",
      icon: mail,
      url: "https://seckc.org/newsletter",
      color: "warning",
      isActive: true,
      type: "secondary"
    }
  ];

  const communityStats: CommunityStats = {
    totalMembers: 2450,
    activeDiscussions: 15,
    monthlyEvents: 4,
    resourcesShared: 127
  };

  const recentPosts = [
    {
      id: 1,
      platform: "Discord",
      author: "SecurityPro_KC",
      content: "Great discussion on zero-trust architecture in today's #general channel. Thanks everyone for sharing insights!",
      time: "2 hours ago",
      likes: 12,
      replies: 5
    },
    {
      id: 2,
      platform: "Twitter",
      author: "@SECKC_Official",
      content: "Reminder: Advanced Web Security workshop tomorrow at 6:30 PM. Still a few spots available! #cybersecurity #kansascity",
      time: "4 hours ago",
      likes: 28,
      replies: 8
    },
    {
      id: 3,
      platform: "LinkedIn",
      author: "Mike Rodriguez",
      content: "Just shared my incident response experience from last week's SECKC presentation. Link in comments.",
      time: "1 day ago",
      likes: 45,
      replies: 12
    }
  ];

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'discord': return logoDiscord;
      case 'twitter': return logoTwitter;
      case 'linkedin': return logoLinkedin;
      default: return chatbubbles;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="/images/bob.png" 
                alt="SecKC Logo" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '4px' 
                }}
              />
              Social
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src="/images/bob.png" 
                  alt="SecKC Logo" 
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '6px' 
                  }}
                />
                Social
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="social-container">
          {/* Community Stats */}
          <IonCard className="stats-overview-card">
            <IonCardHeader>
              <IonCardTitle>Community Overview</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <div className="stat-item">
                      <IonIcon icon={people} color="primary" size="large" />
                      <h3>{communityStats.totalMembers.toLocaleString()}</h3>
                      <p>Total Members</p>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <div className="stat-item">
                      <IonIcon icon={chatbubbles} color="success" size="large" />
                      <h3>{communityStats.activeDiscussions}</h3>
                      <p>Active Discussions</p>
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <div className="stat-item">
                      <IonIcon icon={calendar} color="warning" size="large" />
                      <h3>{communityStats.monthlyEvents}</h3>
                      <p>Monthly Events</p>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <div className="stat-item">
                      <IonIcon icon={share} color="tertiary" size="large" />
                      <h3>{communityStats.resourcesShared}</h3>
                      <p>Resources Shared</p>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Primary Social Links */}
          <IonCard className="primary-links-card">
            <IonCardHeader>
              <IonCardTitle>Join Our Communities</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {socialLinks.filter(link => link.type === 'primary').map((link) => (
                <div key={link.id} className="social-link-item primary-link">
                  <div className="link-content">
                    <div className="link-icon">
                      <IonIcon icon={link.icon} size="large" className={`icon-${link.color}`} />
                    </div>
                    <div className="link-info">
                      <h3>{link.name}</h3>
                      <p>{link.description}</p>
                      {link.members && (
                        <div className="member-count">
                          <IonIcon icon={people} size="small" />
                          <span>{link.members.toLocaleString()} members</span>
                          {link.isActive && (
                            <IonBadge color="success" className="active-badge">Active</IonBadge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <IonButton
                    fill="outline"
                    size="default"
                    onClick={() => openLink(link.url)}
                    className="join-button"
                  >
                    Join
                    <IonIcon icon={chevronForward} slot="end" />
                  </IonButton>
                </div>
              ))}
            </IonCardContent>
          </IonCard>

          {/* Secondary Links */}
          <IonCard className="secondary-links-card">
            <IonCardHeader>
              <IonCardTitle>Additional Resources</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {socialLinks.filter(link => link.type === 'secondary').map((link) => (
                  <IonItem 
                    key={link.id} 
                    button 
                    onClick={() => openLink(link.url)}
                    className="secondary-link-item"
                  >
                    <IonIcon icon={link.icon} slot="start" color={link.color} />
                    <IonLabel>
                      <h3>{link.name}</h3>
                      <p>{link.description}</p>
                    </IonLabel>
                    <IonIcon icon={openOutline} slot="end" color="medium" />
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Recent Community Activity */}
          <IonCard className="activity-card">
            <IonCardHeader>
              <div className="activity-header">
                <IonCardTitle>Recent Activity</IonCardTitle>
                <IonChip color="primary" outline>
                  <IonIcon icon={star} size="small" />
                  Live
                </IonChip>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <div className="activity-list">
                {recentPosts.map((post) => (
                  <div key={post.id} className="activity-item">
                    <div className="activity-header-item">
                      <IonAvatar className="platform-avatar">
                        <IonIcon icon={getPlatformIcon(post.platform)} />
                      </IonAvatar>
                      <div className="activity-meta">
                        <h4>{post.author}</h4>
                        <div className="activity-platform">
                          <span>{post.platform}</span>
                          <span className="activity-time">{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="activity-content">{post.content}</p>
                    <div className="activity-stats">
                      <div className="stat">
                        <IonIcon icon={heart} size="small" color="danger" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="stat">
                        <IonIcon icon={chatbubbles} size="small" color="medium" />
                        <span>{post.replies}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </IonCardContent>
          </IonCard>

          {/* Community Guidelines */}
          <IonCard className="guidelines-card">
            <IonCardHeader>
              <IonCardTitle>Community Guidelines</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="guidelines-content">
                <p><strong>🤝 Be Respectful:</strong> Treat all members with courtesy and professionalism</p>
                <p><strong>🔒 Share Responsibly:</strong> No sensitive information or exploit details</p>
                <p><strong>💡 Stay On-Topic:</strong> Keep discussions focused on cybersecurity</p>
                <p><strong>🚫 No Spam:</strong> Quality over quantity in posts and comments</p>
                <p><strong>🎯 Help Others:</strong> Share knowledge and support fellow members</p>
              </div>
              <IonButton 
                expand="block" 
                fill="outline" 
                size="small"
                onClick={() => openLink('https://seckc.org/guidelines')}
                className="guidelines-button"
              >
                View Full Guidelines
                <IonIcon icon={openOutline} slot="end" />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Social;