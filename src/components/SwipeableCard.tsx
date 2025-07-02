import React, { useState, useRef } from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/react';
import { createGesture, GestureDetail } from '@ionic/react';
import { bookmark, bookmarkOutline, share, trash } from 'ionicons/icons';
import HapticService from '../utils/haptic';
import './SwipeableCard.css';

interface SwipeableCardProps {
  title: string;
  content: React.ReactNode;
  onBookmark?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  isBookmarked?: boolean;
  className?: string;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  title,
  content,
  onBookmark,
  onShare,
  onDelete,
  isBookmarked = false,
  className = ''
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLIonCardElement>(null);
  const gestureRef = useRef<HTMLDivElement>(null);

  const handleGesture = (detail: GestureDetail) => {
    const { deltaX, currentX } = detail;
    
    if (deltaX < -50 && !isRevealed) {
      // Swipe left to reveal actions
      setSwipeOffset(-100);
      setIsRevealed(true);
      HapticService.light();
    } else if (deltaX > 50 && isRevealed) {
      // Swipe right to hide actions
      setSwipeOffset(0);
      setIsRevealed(false);
      HapticService.light();
    } else if (Math.abs(deltaX) < 10) {
      // Small movement, reset
      setSwipeOffset(0);
      setIsRevealed(false);
    }
  };

  const handleBookmark = () => {
    HapticService.medium();
    onBookmark?.();
  };

  const handleShare = () => {
    HapticService.light();
    onShare?.();
  };

  const handleDelete = () => {
    HapticService.strong();
    onDelete?.();
  };

  const resetSwipe = () => {
    setSwipeOffset(0);
    setIsRevealed(false);
  };

  return (
    <div className={`swipeable-card-container ${className}`}>
        <div ref={gestureRef} className="gesture-container">
          <IonCard 
            ref={cardRef}
            className="swipeable-card"
            style={{
              transform: `translateX(${swipeOffset}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <IonCardHeader>
              <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {content}
            </IonCardContent>
          </IonCard>
          
          {/* Swipe Actions */}
          <div className={`swipe-actions ${isRevealed ? 'revealed' : ''}`}>
            {onBookmark && (
              <IonButton
                fill="clear"
                size="large"
                onClick={handleBookmark}
                className="action-button bookmark-button"
              >
                <IonIcon 
                  icon={isBookmarked ? bookmark : bookmarkOutline}
                  color={isBookmarked ? 'warning' : 'medium'}
                />
              </IonButton>
            )}
            
            {onShare && (
              <IonButton
                fill="clear"
                size="large"
                onClick={handleShare}
                className="action-button share-button"
              >
                <IonIcon icon={share} color="primary" />
              </IonButton>
            )}
            
            {onDelete && (
              <IonButton
                fill="clear"
                size="large"
                onClick={handleDelete}
                className="action-button delete-button"
              >
                <IonIcon icon={trash} color="danger" />
              </IonButton>
            )}
          </div>
        </div>
    </div>
  );
};

export default SwipeableCard;