using System;
using System.Reactive.Linq;

using ReactiveUI;

using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class MainWindowViewModel : ViewModelBase
    {
        public UserSettings Settings { get; set; }

        private ViewModelBase content;

        public ViewModelBase Content
        {
            get => content;
            private set => this.RaiseAndSetIfChanged(ref content, value);
        }

        public MainWindowViewModel()
        {
            Settings = UserSettings.LoadAll();
            MoveToMainMenu();
        }

        public void MoveToMainMenu()
        {
            var startMenu = new StartMenuViewModel();
            startMenu.OnMoveUserControl
                .Take(1)
                .Subscribe((eventType) =>
                {
                    switch (eventType)
                    {
                        case StartMenuViewEvents.ON_LENT_BUTTON_CLICKED:
                            {
                                MoveToLentView();
                            }
                            break;
                        case StartMenuViewEvents.ON_RETURN_BUTTON_CLICKED:
                            {
                                MoveToReturnView();
                            }
                            break;
                        case StartMenuViewEvents.ON_SETTINGS_KEY_PUSHED:
                            {
                                MoveToUserSettings();
                            }
                            break;
                    }
                });
            Content = startMenu;
        }

        public void MoveToLentView()
        {
            var lentView = new LentViewModel();
            lentView.OnMoveToStartMenu
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToMainMenu();
                });
            Content = lentView;
        }

        public void MoveToReturnView()
        {
            Content = new ReturnViewModel();
        }

        public void MoveToUserSettings()
        {
            Content = new UserSettingsViewModel();
        }
    }
}
