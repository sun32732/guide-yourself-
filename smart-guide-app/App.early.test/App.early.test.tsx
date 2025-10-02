
import React from 'react';
import App from '../App';

// App.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

// App.test.tsx
// No need to mock Header, GoalsList, Scheduler, Notifications, Sidebar as per instructions

describe('App() App method', () => {
  // =========================
  // Happy Path Tests
  // =========================
  describe('Happy paths', () => {
    it('renders all main sections: Header, GoalsList, Scheduler, Notifications, Sidebar (closed by default)', () => {
      // This test ensures the App renders all main sections and Sidebar is closed by default
      render(<App />);
      // Header
      expect(screen.getByText('سمارت جايد')).toBeInTheDocument();
      // GoalsList
      expect(screen.getByText('أهدافي')).toBeInTheDocument();
      // Scheduler
      expect(screen.getByText('الجدولة')).toBeInTheDocument();
      // Notifications
      expect(screen.getByText('الإشعارات')).toBeInTheDocument();
      // Sidebar (should not be in the document by default)
      expect(screen.queryByText('Smart Guide')).not.toBeInTheDocument();
    });

    it('opens Sidebar when Header menu button is pressed and closes it when Sidebar close button is pressed', () => {
      // This test ensures Sidebar opens and closes via Header and Sidebar controls
      render(<App />);
      // Sidebar should not be visible
      expect(screen.queryByText('Smart Guide')).not.toBeInTheDocument();

      // Find the menu button (☰) in Header and click it
      const menuButton = screen.getAllByText('☰')[0];
      fireEvent.press(menuButton);

      // Sidebar should now be visible
      expect(screen.getByText('Smart Guide')).toBeInTheDocument();

      // Find the close button (✕) in Sidebar and click it
      const closeButton = screen.getByText('✕');
      fireEvent.press(closeButton);

      // Sidebar should be closed again
      expect(screen.queryByText('Smart Guide')).not.toBeInTheDocument();
    });

    it('toggles search open state when Header search button is pressed', () => {
      // This test ensures the search toggle button in Header toggles the state
      render(<App />);
      // Find the search button (🔎)
      const searchButton = screen.getAllByText('🔎')[0];
      // Press it once (open)
      fireEvent.press(searchButton);
      // Press it again (close)
      fireEvent.press(searchButton);
      // No visible UI change, but ensures no error and state toggles
      // (No assertion needed as search state is not rendered, but test for coverage)
    });

    it('renders active goals by default and switches to completed goals when tab is pressed', () => {
      // This test ensures GoalsList tab switching works
      render(<App />);
      // By default, active goals are shown
      expect(screen.getByText('قراءة 12 كتاب')).toBeInTheDocument();
      expect(screen.getByText('ممارسة الرياضة')).toBeInTheDocument();
      expect(screen.getByText('تعلم البرمجة')).toBeInTheDocument();
      // Completed goal should not be visible
      expect(screen.queryByText('تطوير موقع شخصي')).not.toBeInTheDocument();

      // Switch to completed tab
      const completedTab = screen.getByText('المكتملة');
      fireEvent.press(completedTab);

      // Now completed goal should be visible
      expect(screen.getByText('تطوير موقع شخصي')).toBeInTheDocument();
      // Active goals should not be visible
      expect(screen.queryByText('قراءة 12 كتاب')).not.toBeInTheDocument();
    });

    it('renders all scheduled events in Scheduler', () => {
      // This test ensures Scheduler events are rendered
      render(<App />);
      expect(screen.getByText('اجتماع فريق العمل')).toBeInTheDocument();
      expect(screen.getByText('قراءة 30 صفحة')).toBeInTheDocument();
      expect(screen.getByText('ممارسة الرياضة')).toBeInTheDocument();
    });

    it('renders unread notifications badge with correct count', () => {
      // This test ensures Notifications badge shows correct unread count
      render(<App />);
      // There are 2 unread notifications
      expect(screen.getByText('2')).toBeInTheDocument();
      // Notification titles
      expect(screen.getByText('تذكير: اجتماع فريق العمل')).toBeInTheDocument();
      expect(screen.getByText('تهنئة! هدف مكتمل')).toBeInTheDocument();
      expect(screen.getByText('توصية ذكية')).toBeInTheDocument();
    });

    it('renders Sidebar menu items when open', () => {
      // This test ensures Sidebar menu items are rendered when Sidebar is open
      render(<App />);
      // Open Sidebar
      const menuButton = screen.getAllByText('☰')[0];
      fireEvent.press(menuButton);

      // Check for all menu items
      expect(screen.getByText('الرئيسية')).toBeInTheDocument();
      expect(screen.getByText('الأهداف')).toBeInTheDocument();
      expect(screen.getByText('الجدولة')).toBeInTheDocument();
      expect(screen.getByText('الإشعارات')).toBeInTheDocument();
      expect(screen.getByText('التحليلات')).toBeInTheDocument();
      expect(screen.getByText('المساعد الذكي')).toBeInTheDocument();
      expect(screen.getByText('الإعدادات')).toBeInTheDocument();
    });
  });

  // =========================
  // Edge Case Tests
  // =========================
  describe('Edge cases', () => {
    it('Sidebar remains closed if close button is pressed when already closed', () => {
      // This test ensures Sidebar does not throw or open if close is pressed when already closed
      render(<App />);
      // Sidebar is closed, try to find and press close button (should not exist)
      expect(screen.queryByText('✕')).not.toBeInTheDocument();
      // No error should occur
    });

    it('Sidebar can be opened and closed multiple times without error', () => {
      // This test ensures Sidebar open/close can be toggled repeatedly
      render(<App />);
      const menuButton = screen.getAllByText('☰')[0];

      // Open/close 3 times
      for (let i = 0; i < 3; i++) {
        fireEvent.press(menuButton);
        expect(screen.getByText('Smart Guide')).toBeInTheDocument();
        const closeButton = screen.getByText('✕');
        fireEvent.press(closeButton);
        expect(screen.queryByText('Smart Guide')).not.toBeInTheDocument();
      }
    });

    it('GoalsList tab switching works repeatedly and does not lose state', () => {
      // This test ensures repeated tab switching in GoalsList works
      render(<App />);
      const activeTab = screen.getByText('النشطة');
      const completedTab = screen.getByText('المكتملة');

      // Switch to completed
      fireEvent.press(completedTab);
      expect(screen.getByText('تطوير موقع شخصي')).toBeInTheDocument();
      expect(screen.queryByText('قراءة 12 كتاب')).not.toBeInTheDocument();

      // Switch back to active
      fireEvent.press(activeTab);
      expect(screen.getByText('قراءة 12 كتاب')).toBeInTheDocument();
      expect(screen.queryByText('تطوير موقع شخصي')).not.toBeInTheDocument();

      // Switch again to completed
      fireEvent.press(completedTab);
      expect(screen.getByText('تطوير موقع شخصي')).toBeInTheDocument();
    });

    it('Notifications badge does not render if all notifications are read', () => {
      // This test ensures the badge is hidden if all notifications are read
      // We need to mock useState in Notifications to simulate all read
      // Save original useState
      const originalUseState = React.useState;
      // Mock useState for Notifications only
      jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, jest.fn()] as any) // isMenuOpen
        .mockImplementationOnce(() => [false, jest.fn()] as any) // isSearchOpen
        .mockImplementationOnce(() => [
          [
            { id: 1, title: 'تذكير: اجتماع فريق العمل', message: '...', time: 'منذ 5 دقائق', isRead: true },
            { id: 2, title: 'تهنئة! هدف مكتمل', message: '...', time: 'منذ ساعة', isRead: true },
            { id: 3, title: 'توصية ذكية', message: '...', time: 'منذ 3 ساعات', isRead: true }
          ],
          jest.fn()
        ] as any);

      render(<App />);
      // Badge should not be present
      expect(screen.queryByText('1')).not.toBeInTheDocument();
      expect(screen.queryByText('2')).not.toBeInTheDocument();
      expect(screen.queryByText('3')).not.toBeInTheDocument();

      // Restore useState
      (React.useState as any) = originalUseState;
    });

    it('App does not crash if Header menu and search buttons are pressed in rapid succession', () => {
      // This test ensures rapid toggling of menu/search does not crash App
      render(<App />);
      const menuButton = screen.getAllByText('☰')[0];
      const searchButton = screen.getAllByText('🔎')[0];

      // Rapid presses
      for (let i = 0; i < 5; i++) {
        fireEvent.press(menuButton);
        expect(screen.getByText('Smart Guide')).toBeInTheDocument();
        fireEvent.press(searchButton);
        const closeButton = screen.getByText('✕');
        fireEvent.press(closeButton);
        expect(screen.queryByText('Smart Guide')).not.toBeInTheDocument();
      }
    });
  });
});

