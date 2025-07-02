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
  IonItem,
  IonLabel,
  IonChip,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonSpinner
} from '@ionic/react';
import ReactMarkdown from 'react-markdown';
import {
  calendar,
  location,
  people,
  bookmark,
  bookmarkOutline,
  chevronForward,
  navigate,
  linkOutline
} from 'ionicons/icons';
import { eventsService } from '../services/firebaseService';
import { rsvpService } from '../services/rsvpService';
import { Event } from '../services/types';
import { useAuth } from '../contexts/AuthContext';
import './Events.css';

// Using Event interface from types.ts

const Events: React.FC = () => {
  const { user } = useAuth();
  const [selectedSegment, setSelectedSegment] = useState<string>('upcoming');
  const [searchText, setSearchText] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRsvps, setUserRsvps] = useState<{ [eventId: string]: boolean }>({});
  const [eventRsvpCounts, setEventRsvpCounts] = useState<{ [eventId: string]: number }>({});
  const [rsvpLoading, setRsvpLoading] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      loadRsvpData();
    }
  }, [events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await eventsService.getEvents({
        limit: 50
      });
      setEvents(eventsData);
    } catch (err) {
      setError(`Failed to load events: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (eventId: string) => {
    if (!user) return;
    
    try {
      // Update local state immediately for better UX
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, isBookmarked: !event.isBookmarked }
          : event
      ));
      
      // Here you would implement bookmark service
      // For now, we'll just update the local state
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      // Revert on error
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, isBookmarked: !event.isBookmarked }
          : event
      ));
    }
  };

  const loadRsvpData = async () => {
    if (events.length === 0) return;
    
    try {
      const eventIds = events.map(event => event.id);
      
      // Load user's RSVPs and event counts
      const [userRsvpData, eventCounts] = await Promise.all([
        rsvpService.getUserRsvps(),
        rsvpService.getEventRsvpCounts(eventIds)
      ]);
      
      setUserRsvps(userRsvpData);
      setEventRsvpCounts(eventCounts);
    } catch (error) {
      console.error('Error loading RSVP data:', error);
    }
  };

  const handleRSVP = async (eventId: string) => {
    if (rsvpLoading) return;
    
    try {
      setRsvpLoading(eventId);
      const result = await rsvpService.toggleRsvp(eventId);
      
      // Update local state
      setUserRsvps({ ...userRsvps, [eventId]: result.isRsvped });
      setEventRsvpCounts({ ...eventRsvpCounts, [eventId]: result.newCount });
    } catch (error) {
      console.error('Error handling RSVP:', error);
    } finally {
      setRsvpLoading(null);
    }
  };

  const openInMaps = (address: string, locationName?: string) => {
    const query = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
  };

  const openEventWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  const openSponsorLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadEvents();
    event.detail.complete();
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.eventDate);
    const isPast = eventDate < now;
    
    const matchesSegment = selectedSegment === 'upcoming' ? !isPast : 
                          selectedSegment === 'past' ? isPast :
                          event.isBookmarked;
    
    const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         (event.speakerName && event.speakerName.toLowerCase().includes(searchText.toLowerCase())) ||
                         (event.speakerNames && event.speakerNames.some(speaker => speaker.toLowerCase().includes(searchText.toLowerCase()))) ||
                         (Array.isArray(event.topics) && event.topics.some(topic => topic.toLowerCase().includes(searchText.toLowerCase())));
    
    return matchesSegment && matchesSearch;
  });


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
              Events
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
                Events
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="events-container">
          {/* Search Bar */}
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search events, speakers, topics..."
            showClearButton="focus"
          />

          {/* Segment Control */}
          <IonSegment
            value={selectedSegment}
            onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
            className="events-segment"
          >
            <IonSegmentButton value="upcoming">
              <IonLabel>Upcoming</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="bookmarked">
              <IonLabel>Bookmarked</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="past">
              <IonLabel>Past</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Loading State */}
          {loading && (
            <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
              <IonSpinner name="circular" />
              <p>Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-container" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--ion-color-danger)' }}>{error}</p>
              <IonButton fill="outline" onClick={loadEvents}>
                Try Again
              </IonButton>
            </div>
          )}

          {/* Events List */}
          {!loading && !error && (
            <IonList className="events-list">
              {filteredEvents.map((event) => (
              <IonCard key={event.id} className="event-card">
                <IonCardHeader>
                  <div className="event-card-header">
                    <div className="event-meta">
                      {(Array.isArray(event.topics) ? event.topics : []).slice(0, 2).map((topic, index) => (
                        <IonChip key={index} color="primary" outline>
                          {topic}
                        </IonChip>
                      ))}
                    </div>
                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => toggleBookmark(event.id)}
                    >
                      <IonIcon
                        icon={event.isBookmarked ? bookmark : bookmarkOutline}
                        color={event.isBookmarked ? 'warning' : 'medium'}
                      />
                    </IonButton>
                  </div>
                  <IonCardTitle className="event-card-title">
                    {event.eventUrl ? (
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          cursor: 'pointer',
                          color: 'var(--ion-color-primary)'
                        }}
                        onClick={() => openEventWebsite(event.eventUrl!)}
                      >
                        {event.title}
                        <IonIcon 
                          icon={linkOutline} 
                          size="small" 
                          style={{ marginLeft: '8px' }}
                        />
                      </div>
                    ) : (
                      event.title
                    )}
                  </IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent>
                  <IonGrid className="event-info">
                    <IonRow>
                      <IonCol size="12">
                        <IonItem lines="none" className="event-info-item">
                          <IonIcon icon={calendar} slot="start" color="primary" />
                          <IonLabel>
                            <h3>{formatEventDate(event.eventDate)}</h3>
                            <p>{formatEventTime(event.eventDate, event.endDate)}</p>
                          </IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    
                    <IonRow>
                      <IonCol size="12">
                        {event.isVirtual ? (
                          <IonItem lines="none" className="event-info-item">
                            <IonIcon icon={location} slot="start" color="primary" />
                            <IonLabel>
                              <h3>Virtual Event</h3>
                              {event.virtualLink && <p>Join link will be provided</p>}
                            </IonLabel>
                          </IonItem>
                        ) : (
                          <IonItem 
                            lines="none" 
                            className="event-info-item"
                            button={!!event.address}
                            onClick={() => event.address && openInMaps(event.address, event.location)}
                          >
                            <IonIcon icon={location} slot="start" color="primary" />
                            <IonLabel>
                              <h3>{event.location || 'Location TBD'}</h3>
                              {event.address && <p>{event.address}</p>}
                            </IonLabel>
                            {event.address && (
                              <IonIcon icon={navigate} slot="end" color="medium" />
                            )}
                          </IonItem>
                        )}
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="12">
                        <IonItem lines="none" className="event-info-item">
                          <IonAvatar slot="start" className="speaker-avatar-small">
                            {event.speakerImageUrl ? (
                              <img src={event.speakerImageUrl} alt={event.speakerNames?.[0] || event.speakerName} />
                            ) : (
                              <div className="speaker-initial">
                                {(event.speakerNames && event.speakerNames.length > 0) 
                                  ? event.speakerNames[0].charAt(0) 
                                  : event.speakerName?.charAt(0) || '?'}
                              </div>
                            )}
                          </IonAvatar>
                          <IonLabel>
                            <h3>
                              {(event.speakerNames && event.speakerNames.length > 0)
                                ? event.speakerNames.length === 1 
                                  ? event.speakerNames[0]
                                  : `${event.speakerNames[0]} +${event.speakerNames.length - 1} more`
                                : event.speakerName || 'Speaker TBD'
                              }
                            </h3>
                            <p>{event.speakerTitle || 'Speaker'}</p>
                          </IonLabel>
                          <IonBadge color="medium" slot="end">
                            <IonIcon icon={people} size="small" />
                            {eventRsvpCounts[event.id] || 0}
                          </IonBadge>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <div className="event-description">
                    <ReactMarkdown>{event.description}</ReactMarkdown>
                  </div>

                  {/* Sponsors Section */}
                  {(event.sponsorLinks && Object.keys(event.sponsorLinks).length > 0) && (
                    <div className="event-sponsors" style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--ion-color-medium)' }}>
                        Sponsored by:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {(() => {
                          // Use sponsorOrder if available, otherwise fall back to Object.keys
                          const orderedSponsors = event.sponsorOrder && Array.isArray(event.sponsorOrder) && event.sponsorOrder.length > 0 
                            ? event.sponsorOrder 
                            : Object.keys(event.sponsorLinks || {});
                          
                          return orderedSponsors.map((sponsor, index) => {
                            const url = event.sponsorLinks?.[sponsor];
                            if (!url) return null; // Skip if sponsor not found in links
                            
                            return (
                              <IonChip 
                                key={`sponsor-${index}`} 
                                color="secondary" 
                                outline
                                onClick={() => openSponsorLink(url)}
                                style={{
                                  cursor: 'pointer'
                                }}
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

                  <div className="event-actions">
                    {new Date(event.eventDate) > new Date() ? (
                      <>
                        <IonButton 
                          expand="block" 
                          color={userRsvps[event.id] ? 'medium' : 'success'}
                          className="rsvp-btn"
                          onClick={() => handleRSVP(event.id)}
                          disabled={rsvpLoading === event.id}
                        >
                          {rsvpLoading === event.id 
                            ? 'Processing...' 
                            : userRsvps[event.id] 
                              ? 'RSVP\'d' 
                              : 'RSVP'}
                        </IonButton>
                        <IonButton 
                          fill="outline" 
                          expand="block"
                          className="details-btn"
                          onClick={() => event.eventUrl && openEventWebsite(event.eventUrl)}
                          disabled={!event.eventUrl}
                        >
                          View Details
                          <IonIcon icon={chevronForward} slot="end" />
                        </IonButton>
                      </>
                    ) : (
                      <IonButton 
                        fill="outline" 
                        expand="block"
                        color="medium"
                        className="details-btn"
                        disabled={!event.recordingUrl}
                      >
                        {event.recordingUrl ? 'View Recording' : 'Recording Unavailable'}
                        <IonIcon icon={chevronForward} slot="end" />
                      </IonButton>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
              ))}
            </IonList>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className="no-events">
              <IonIcon icon={calendar} size="large" color="medium" />
              <h3>No events found</h3>
              <p>Try adjusting your search or check back later for new events.</p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Events;