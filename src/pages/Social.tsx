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
  people,
  newspaper,
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
      url: "https://twitter.com/seck_kc",
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
      url: "https://www.linkedin.com/company/seckc-inc/",
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



  const openLink = (url: string) => {
    window.open(url, '_blank');
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


          {/* Code of Conduct */}
          <IonCard className="guidelines-card">
            <IonCardHeader>
              <IonCardTitle>Code of Conduct</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="guidelines-content">
                <p><strong>🎯 Core Principle:</strong> "Challenge ideas, not people"</p>
                <p><strong>🤝 Respect Diversity:</strong> Welcome and encourage diverse viewpoints</p>
                <p><strong>🚫 No Harassment:</strong> Zero tolerance for intimidation or making others feel unwelcome</p>
                <p><strong>⚡ Immediate Compliance:</strong> Stop inappropriate behavior when asked</p>
                <p><strong>📢 Report Issues:</strong> Contact volunteers or email codeofconduct@seckc.org</p>
              </div>
              <IonButton 
                expand="block" 
                fill="outline" 
                size="small"
                onClick={() => openLink('https://www.seckc.org/code-of-conduct')}
                className="guidelines-button"
              >
                View Full Code of Conduct
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