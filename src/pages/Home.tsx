import React, { useState, useEffect } from 'react';
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
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel,
  IonItem,
  IonAvatar,
  IonBadge,
  IonSpinner,
  IonSkeletonText
} from '@ionic/react';
import { 
  shield, 
  calendar, 
  location, 
  time, 
  people,
  checkmark,
  notifications,
  linkOutline
} from 'ionicons/icons';
import { eventsService } from '../services/firebaseService';
import { Event } from '../services/types';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNextEvent();
  }, []);

  const loadNextEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get upcoming events
      const events = await eventsService.getEvents({
        limit: 10
      });
      
      // Filter to upcoming events and get the next one
      const now = new Date();
      const upcomingEvents = events
        .filter(event => new Date(event.eventDate) > now)
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
      
      if (upcomingEvents.length > 0) {
        setNextEvent(upcomingEvents[0]);
      }
    } catch (err) {
      setError('Failed to load next event');
      console.error('Error loading next event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async () => {
    if (!user || !nextEvent) return;
    
    try {
      await eventsService.rsvpToEvent(nextEvent.id, user.uid, 'attending');
      // Refresh event data to show updated RSVP status
      await loadNextEvent();
    } catch (err) {
      console.error('Error RSVPing to event:', err);
    }
  };

  const openEventWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatEventTime = (dateString: string, endDateString?: string) => {
    const startDate = new Date(dateString);
    const startTime = startDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
    
    if (endDateString) {
      const endDate = new Date(endDateString);
      const endTime = endDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      });
      return `${startTime} - ${endTime}`;
    }
    
    return startTime;
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
              SECKC
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
                SECKC
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="home-container">
          {/* Welcome Section */}
          <IonCard className="welcome-card">
            <IonCardHeader>
              <IonCardTitle color="primary">Welcome to SECKC</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Join Kansas City's premier cybersecurity community. Connect with professionals, learn cutting-edge techniques, and advance your security career.</p>
            </IonCardContent>
          </IonCard>

          {/* Next Event Preview */}
          <IonCard className="event-preview-card">
            <IonCardHeader>
              <div className="event-header">
                <IonCardTitle>Next Event</IonCardTitle>
                {nextEvent && (
                  <IonBadge color="success">
                    <IonIcon icon={notifications} size="small" />
                    Upcoming
                  </IonBadge>
                )}
              </div>
            </IonCardHeader>
            <IonCardContent>
              {loading ? (
                <div>
                  <IonSkeletonText animated style={{ width: '80%', height: '32px' }} />
                  <br />
                  <IonSkeletonText animated style={{ width: '60%' }} />
                  <IonSkeletonText animated style={{ width: '70%' }} />
                  <IonSkeletonText animated style={{ width: '50%' }} />
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'var(--ion-color-danger)' }}>{error}</p>
                  <IonButton fill="outline" onClick={loadNextEvent}>
                    Try Again
                  </IonButton>
                </div>
              ) : nextEvent ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <h2 className="event-title" style={{ margin: 0, flex: 1 }}>
                      {nextEvent.title}
                    </h2>
                    {nextEvent.eventUrl && (
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={() => openEventWebsite(nextEvent.eventUrl!)}
                      >
                        <IonIcon icon={linkOutline} />
                      </IonButton>
                    )}
                  </div>
              
                  <IonGrid className="event-details">
                    <IonRow>
                      <IonCol size="12">
                        <IonItem lines="none" className="event-detail-item">
                          <IonIcon icon={calendar} slot="start" color="primary" />
                          <IonLabel>
                            <h3>{formatEventDate(nextEvent.eventDate)}</h3>
                            <p>{formatEventTime(nextEvent.eventDate, nextEvent.endDate)}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    
                    <IonRow>
                      <IonCol size="12">
                        <IonItem lines="none" className="event-detail-item">
                          <IonIcon icon={location} slot="start" color="primary" />
                          <IonLabel>
                            <h3>{nextEvent.isVirtual ? 'Virtual Event' : nextEvent.location || 'Location TBD'}</h3>
                            {nextEvent.address && <p>{nextEvent.address}</p>}
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="12">
                        <IonItem lines="none" className="event-detail-item">
                          <IonAvatar slot="start">
                            <div className="speaker-avatar">
                              {(nextEvent.speakerNames && nextEvent.speakerNames.length > 0) 
                                ? nextEvent.speakerNames[0].charAt(0) 
                                : nextEvent.speakerName?.charAt(0) || '?'}
                            </div>
                          </IonAvatar>
                          <IonLabel>
                            <h3>
                              Speaker: {(nextEvent.speakerNames && nextEvent.speakerNames.length > 0)
                                ? nextEvent.speakerNames.length === 1 
                                  ? nextEvent.speakerNames[0]
                                  : `${nextEvent.speakerNames[0]} +${nextEvent.speakerNames.length - 1} more`
                                : nextEvent.speakerName || 'TBD'
                              }
                            </h3>
                            <p>{nextEvent.speakerTitle || 'Security Professional'}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="12">
                        <IonItem lines="none" className="event-detail-item">
                          <IonIcon icon={people} slot="start" color="primary" />
                          <IonLabel>
                            <h3>{nextEvent.attendeeCount || 0} attending</h3>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <div className="event-description">
                    <p>{nextEvent.description}</p>
                  </div>

                  {(Array.isArray(nextEvent.topics) && nextEvent.topics.length > 0) && (
                    <div className="event-topics">
                      <h4>Topics Covered:</h4>
                      <div className="topics-chips">
                        {nextEvent.topics.map((topic, index) => (
                          <IonChip key={index} color="primary" outline>
                            <IonLabel>{topic}</IonLabel>
                          </IonChip>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sponsors Section */}
                  {(nextEvent.sponsorLinks && Object.keys(nextEvent.sponsorLinks).length > 0) && (
                    <div className="event-sponsors" style={{ marginBottom: '16px' }}>
                      <h4>Sponsored by:</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {(() => {
                          const orderedSponsors = nextEvent.sponsorOrder && Array.isArray(nextEvent.sponsorOrder) && nextEvent.sponsorOrder.length > 0 
                            ? nextEvent.sponsorOrder 
                            : Object.keys(nextEvent.sponsorLinks);
                          
                          return orderedSponsors.map((sponsor, index) => {
                            const url = nextEvent.sponsorLinks![sponsor];
                            if (!url) return null;
                            
                            return (
                              <IonChip 
                                key={`sponsor-${index}`} 
                                color="secondary" 
                                outline
                                onClick={() => openEventWebsite(url)}
                                style={{ cursor: 'pointer' }}
                              >
                                {sponsor}
                                <IonIcon 
                                  icon={linkOutline} 
                                  size="small" 
                                  style={{ marginLeft: '4px' }}
                                />
                              </IonChip>
                            );
                          }).filter(Boolean);
                        })()}
                      </div>
                    </div>
                  )}

                  <div className="rsvp-section">
                    <IonButton 
                      expand="block" 
                      size="large" 
                      color={nextEvent.userRsvpStatus === 'attending' ? 'medium' : 'success'}
                      onClick={handleRSVP}
                      className="rsvp-button"
                      disabled={!user}
                    >
                      <IonIcon icon={checkmark} slot="start" />
                      {nextEvent.userRsvpStatus === 'attending' ? 'RSVP\'d' : 'RSVP for This Event'}
                    </IonButton>
                    <p className="rsvp-note">Free for all members • Light refreshments provided</p>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <IonIcon icon={calendar} size="large" color="medium" />
                  <h3>No Upcoming Events</h3>
                  <p>Check back soon for new events!</p>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          {/* Quick Stats */}
          <IonCard className="stats-card">
            <IonCardContent>
              <IonGrid>
                <IonRow className="stats-row">
                  <IonCol size="4" className="stat-col">
                    <div className="stat">
                      <h2>500+</h2>
                      <p>Members</p>
                    </div>
                  </IonCol>
                  <IonCol size="4" className="stat-col">
                    <div className="stat">
                      <h2>50+</h2>
                      <p>Events</p>
                    </div>
                  </IonCol>
                  <IonCol size="4" className="stat-col">
                    <div className="stat">
                      <h2>12+</h2>
                      <p>Years</p>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;