using System;
using System.Reactive.Linq;

using MessageBox.Avalonia.DTO;
using MessageBox.Avalonia.Enums;
using ReactiveUI;

using Yatsugi.Views;
using Yatsugi.Models;
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
            ToolDataBase.LoadAll();
            MoveToStartMenu();
        }

        public void MoveToStartMenu()
        {
            var startMenu = new StartMenuViewModel();
            startMenu.OnLentButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToLentView();
                });
            startMenu.OnReturnButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToReturnView();
                });
            startMenu.OnManageButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToToolManagerView();
                });
            startMenu.OnSettingKeyDown
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToUserSettings();
                });
            Content = startMenu;
        }

        public void MoveToLentView()
        {
            var lentView = new LentViewModel();
            lentView.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToStartMenu();
                });
            Content = lentView;
        }

        public void MoveToReturnView()
        {
            Content = new ReturnViewModel();
        }

        public void MoveToToolManagerView()
        {
            var toolManagerViewModel = new ToolManagerViewModel();
            toolManagerViewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToStartMenu();
                });
            Content = toolManagerViewModel;
        }

        public void MoveToUserSettings()
        {
            Content = new UserSettingsViewModel();
        }
    }
}
