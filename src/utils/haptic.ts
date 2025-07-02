import { Haptics, ImpactStyle } from '@capacitor/haptics';

export class HapticService {
  private static isEnabled = true;
  
  static setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }
  
  static async light() {
    if (!this.isEnabled) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  static async medium() {
    if (!this.isEnabled) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  static async strong() {
    if (!this.isEnabled) return;
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }
  
  static async notification() {
    if (!this.isEnabled) return;
    try {
      await Haptics.notification();
    } catch (error) {
      console.warn('Haptic notification not available:', error);
    }
  }
  
  static async selection() {
    if (!this.isEnabled) return;
    try {
      await Haptics.selectionStart();
    } catch (error) {
      console.warn('Haptic selection not available:', error);
    }
  }
}

export default HapticService;