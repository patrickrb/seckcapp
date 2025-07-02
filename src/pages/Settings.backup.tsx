import React, { useState } from 'react';
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
  IonRange,
  IonNote,
  IonAlert,
  IonActionSheet,
  IonChip,
  IonBadge,
  IonItemDivider,
  IonItemGroup,
  IonText
} from '@ionic/react';
import {
  notifications as notificationsIcon,
  moon,
  language,
  colorPalette,
  shield,
  person,
  informationCircle,
  bug,
  mail,
  trash,
  download,
  refresh,
  checkmark,
  warning,
  settings,
  phonePortrait
} from 'ionicons/icons';
import './Settings.css';

interface NotificationSettings {
  eventReminders: boolean;
  newEvents: boolean;
  socialUpdates: boolean;
  securityAlerts: boolean;
  newsletter: boolean;
}

interface AppSettings {
  theme: 'auto' | 'light' | 'dark';
  language: string;
  fontSize: number;
  hapticFeedback: boolean;
  autoRefresh: boolean;
  cacheSize: number;
}

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    eventReminders: true,
    newEvents: true,
    socialUpdates: false,
    securityAlerts: true,
    newsletter: true
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'auto',
    language: 'en',
    fontSize: 16,
    hapticFeedback: true,
    autoRefresh: true,
    cacheSize: 50
  });

  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updateAppSetting = (key: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    // Export user data functionality
    console.log('Exporting user data...');
  };

  const handleClearCache = () => {
    // Clear app cache functionality
    console.log('Clearing cache...');
  };

  const handleResetSettings = () => {
    setNotifications({
      eventReminders: true,
      newEvents: true,
      socialUpdates: false,
      securityAlerts: true,
      newsletter: true
    });
    setAppSettings({
      theme: 'auto',
      language: 'en',
      fontSize: 16,
      hapticFeedback: true,
      autoRefresh: true,
      cacheSize: 50
    });
    setShowResetAlert(false);
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
          <IonCard className="settings-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={person} />
                Account
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button>
                  <IonLabel>
                    <h2>Profile Information</h2>
                    <p>Manage your personal details and preferences</p>
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonLabel>
                    <h2>Privacy Settings</h2>
                    <p>Control your data sharing and visibility</p>
                  </IonLabel>
                </IonItem>
                <IonItem button>
                  <IonLabel>
                    <h2>Security</h2>
                    <p>Two-factor authentication and login settings</p>
                  </IonLabel>
                  <IonBadge color="success" slot="end">
                    <IonIcon icon={shield} size="small" />
                    Secure
                  </IonBadge>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

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
                    <h2>Social Updates</h2>
                    <p>Community posts and discussions</p>
                  </IonLabel>
                  <IonToggle
                    checked={notifications.socialUpdates}
                    onIonChange={(e) => updateNotificationSetting('socialUpdates', e.detail.checked)}
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
                
                <IonItem>
                  <IonLabel>
                    <h2>Newsletter</h2>
                    <p>Monthly SECKC newsletter</p>
                  </IonLabel>
                  <IonToggle
                    checked={notifications.newsletter}
                    onIonChange={(e) => updateNotificationSetting('newsletter', e.detail.checked)}
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
                  <IonIcon icon={language} slot="start" />
                  <IonLabel>Language</IonLabel>
                  <IonSelect
                    value={appSettings.language}
                    onIonChange={(e) => updateAppSetting('language', e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="en">English</IonSelectOption>
                    <IonSelectOption value="es">Español</IonSelectOption>
                    <IonSelectOption value="fr">Français</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItemGroup>
                  <IonItemDivider>
                    <IonLabel>Font Size</IonLabel>
                    <IonNote slot="end">{appSettings.fontSize}px</IonNote>
                  </IonItemDivider>
                  <IonItem>
                    <IonRange
                      value={appSettings.fontSize}
                      min={12}
                      max={24}
                      step={2}
                      pin={true}
                      onIonChange={(e) => updateAppSetting('fontSize', e.detail.value)}
                    />
                  </IonItem>
                </IonItemGroup>

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

                <IonItemGroup>
                  <IonItemDivider>
                    <IonLabel>Cache Size</IonLabel>
                    <IonNote slot="end">{appSettings.cacheSize}MB</IonNote>
                  </IonItemDivider>
                  <IonItem>
                    <IonRange
                      value={appSettings.cacheSize}
                      min={10}
                      max={200}
                      step={10}
                      pin={true}
                      onIonChange={(e) => updateAppSetting('cacheSize', e.detail.value)}
                      color="tertiary"
                    />
                  </IonItem>
                </IonItemGroup>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Data & Storage */}
          <IonCard className="settings-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={download} />
                Data & Storage
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem button onClick={handleExportData}>
                  <IonIcon icon={download} slot="start" color="primary" />
                  <IonLabel>
                    <h2>Export Data</h2>
                    <p>Download your personal data</p>
                  </IonLabel>
                </IonItem>
                
                <IonItem button onClick={handleClearCache}>
                  <IonIcon icon={trash} slot="start" color="warning" />
                  <IonLabel>
                    <h2>Clear Cache</h2>
                    <p>Free up storage space</p>
                  </IonLabel>
                  <IonNote slot="end">~{appSettings.cacheSize}MB</IonNote>
                </IonItem>
                
                <IonItem button onClick={() => setShowActionSheet(true)}>
                  <IonIcon icon={informationCircle} slot="start" color="medium" />
                  <IonLabel>
                    <h2>Storage Usage</h2>
                    <p>View detailed storage breakdown</p>
                  </IonLabel>
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
                <IonItem button>
                  <IonIcon icon={mail} slot="start" color="primary" />
                  <IonLabel>
                    <h2>Contact Support</h2>
                    <p>Get help with the app</p>
                  </IonLabel>
                </IonItem>
                
                <IonItem button>
                  <IonIcon icon={bug} slot="start" color="danger" />
                  <IonLabel>
                    <h2>Report Bug</h2>
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
                Danger Zone
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                <p>These actions cannot be undone. Please proceed with caution.</p>
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

        {/* Reset Confirmation Alert */}
        <IonAlert
          isOpen={showResetAlert}
          onDidDismiss={() => setShowResetAlert(false)}
          header="Reset Settings"
          message="Are you sure you want to reset all settings to their default values? This action cannot be undone."
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

        {/* Storage Action Sheet */}
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          header="Storage Usage"
          subHeader={`Total: ${appSettings.cacheSize + 15}MB`}
          buttons={[
            {
              text: `Cache: ${appSettings.cacheSize}MB`,
              icon: trash,
              handler: handleClearCache
            },
            {
              text: 'User Data: 15MB',
              icon: person,
              handler: handleExportData
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;