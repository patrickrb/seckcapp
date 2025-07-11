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
  IonList,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonChip,
  IonBadge,
  IonText,
  IonToast
} from '@ionic/react';
import {
  notifications as notificationsIcon,
  moon,
  colorPalette,
  shield,
  person,
  informationCircle,
  mail,
  refresh,
  checkmark,
  warning,
  settings,
  phonePortrait,
  logOut
} from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import { getStoredTheme, setStoredTheme, applyTheme, type ThemeMode } from '../utils/theme';
import './Settings.css';

interface NotificationSettings {
  eventReminders: boolean;
  newEvents: boolean;
  securityAlerts: boolean;
}

interface AppSettings {
  theme: ThemeMode;
  hapticFeedback: boolean;
  autoRefresh: boolean;
}

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [notifications, setNotifications] = useState<NotificationSettings>({
    eventReminders: true,
    newEvents: true,
    securityAlerts: true
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'dark', // Default to dark
    hapticFeedback: true,
    autoRefresh: true
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('seckc-notifications');
    const savedAppSettings = localStorage.getItem('seckc-app-settings');
    
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedAppSettings) {
      const settings = JSON.parse(savedAppSettings);
      setAppSettings(settings);
    } else {
      // Load current theme from centralized system
      const currentTheme = getStoredTheme();
      setAppSettings(prev => ({ ...prev, theme: currentTheme }));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('seckc-notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('seckc-app-settings', JSON.stringify(appSettings));
    // Update centralized theme system when theme changes
    setStoredTheme(appSettings.theme);
    applyTheme(appSettings.theme);
  }, [appSettings]);

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    showSuccessToast('Notification settings updated');
  };

  const updateAppSetting = (key: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
    showSuccessToast('App settings updated');
  };

  const handleLogout = async () => {
    try {
      await logout();
      showSuccessToast('Logged out successfully');
    } catch (error) {
      showSuccessToast('Error logging out');
    }
    setShowLogoutAlert(false);
  };

  const handleResetSettings = () => {
    setNotifications({
      eventReminders: true,
      newEvents: true,
      securityAlerts: true
    });
    setAppSettings({
      theme: 'dark', // Default to dark
      hapticFeedback: true,
      autoRefresh: true
    });
    localStorage.removeItem('seckc-notifications');
    localStorage.removeItem('seckc-app-settings');
    setStoredTheme('dark'); // Reset centralized theme to dark
    applyTheme('dark');
    showSuccessToast('Settings reset to defaults');
    setShowResetAlert(false);
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const openEmail = (subject: string) => {
    const email = 'support@seckc.org';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink);
  };

  const getThemeIcon = () => {
    switch (appSettings.theme) {
      case 'light': return colorPalette;
      case 'dark': return moon;
      default: return phonePortrait;
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
              Settings
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
                Settings
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="settings-container">
          {/* Account Section */}
          {user && (
            <IonCard className="settings-card">
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={person} />
                  Account
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonLabel>
                      <h2>Email</h2>
                      <p>{user.email}</p>
                    </IonLabel>
                    <IonBadge color="success" slot="end">
                      <IonIcon icon={shield} size="small" />
                      Verified
                    </IonBadge>
                  </IonItem>
                  <IonItem button onClick={() => setShowLogoutAlert(true)}>
                    <IonIcon icon={logOut} slot="start" color="danger" />
                    <IonLabel>
                      <h2>Sign Out</h2>
                      <p>Sign out of your account</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          )}

          {/* Notifications */}
          <IonCard className="settings-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={notificationsIcon} />
                Notifications
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h2>Event Reminders</h2>
                    <p>Get notified before events start</p>
                  </IonLabel>
                  <IonToggle
                    checked={notifications.eventReminders}
                    onIonChange={(e) => updateNotificationSetting('eventReminders', e.detail.checked)}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel>
                    <h2>New Events</h2>
                    <p>Notifications when new events are posted</p>
                  </IonLabel>
                  <IonToggle
                    checked={notifications.newEvents}
                    onIonChange={(e) => updateNotificationSetting('newEvents', e.detail.checked)}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel>
                    <h2>Security Alerts</h2>
                    <p>Important security news and updates</p>
                  </IonLabel>
                  <IonToggle
                    checked={notifications.securityAlerts}
                    onIonChange={(e) => updateNotificationSetting('securityAlerts', e.detail.checked)}
                    color="warning"
                  />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* App Preferences */}
          <IonCard className="settings-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={settings} />
                App Preferences
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonIcon icon={getThemeIcon()} slot="start" />
                  <IonLabel>Theme</IonLabel>
                  <IonSelect
                    value={appSettings.theme}
                    onIonChange={(e) => updateAppSetting('theme', e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="auto">Auto</IonSelectOption>
                    <IonSelectOption value="light">Light</IonSelectOption>
                    <IonSelectOption value="dark">Dark</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonIcon icon={phonePortrait} slot="start" />
                  <IonLabel>
                    <h2>Haptic Feedback</h2>
                    <p>Vibration for touch interactions</p>
                  </IonLabel>
                  <IonToggle
                    checked={appSettings.hapticFeedback}
                    onIonChange={(e) => updateAppSetting('hapticFeedback', e.detail.checked)}
                  />
                </IonItem>

                <IonItem>
                  <IonIcon icon={refresh} slot="start" />
                  <IonLabel>
                    <h2>Auto Refresh</h2>
                    <p>Automatically update content</p>
                  </IonLabel>
                  <IonToggle
                    checked={appSettings.autoRefresh}
                    onIonChange={(e) => updateAppSetting('autoRefresh', e.detail.checked)}
                  />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Support & About */}
          <IonCard className="settings-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={informationCircle} />
                Support & About
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={() => openEmail('App Support Request')}>
                  <IonIcon icon={mail} slot="start" color="primary" />
                  <IonLabel>
                    <h2>Contact Support</h2>
                    <p>Get help with the app</p>
                  </IonLabel>
                </IonItem>
                
                <IonItem button onClick={() => openEmail('Bug Report')}>
                  <IonIcon icon={informationCircle} slot="start" color="warning" />
                  <IonLabel>
                    <h2>Report Issue</h2>
                    <p>Help us improve the app</p>
                  </IonLabel>
                </IonItem>
                
                <IonItem>
                  <IonIcon icon={informationCircle} slot="start" color="medium" />
                  <IonLabel>
                    <h2>App Version</h2>
                    <p>v1.0.0 (Build 1)</p>
                  </IonLabel>
                  <IonChip color="success" slot="end">
                    <IonIcon icon={checkmark} size="small" />
                    Latest
                  </IonChip>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Reset Settings */}
          <IonCard className="danger-zone-card">
            <IonCardHeader>
              <IonCardTitle className="danger-title">
                <IonIcon icon={warning} />
                Reset Settings
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                <p>Reset all app settings to their default values.</p>
              </IonText>
              <IonButton
                expand="block"
                fill="outline"
                color="danger"
                onClick={() => setShowResetAlert(true)}
                className="reset-button"
              >
                <IonIcon icon={refresh} slot="start" />
                Reset All Settings
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Logout Confirmation Alert */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Sign Out"
          message="Are you sure you want to sign out of your account?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Sign Out',
              role: 'destructive',
              handler: handleLogout
            }
          ]}
        />

        {/* Reset Confirmation Alert */}
        <IonAlert
          isOpen={showResetAlert}
          onDidDismiss={() => setShowResetAlert(false)}
          header="Reset Settings"
          message="Are you sure you want to reset all settings to their default values?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Reset',
              role: 'destructive',
              handler: handleResetSettings
            }
          ]}
        />

        {/* Success Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;