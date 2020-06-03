using System;
using System.Reactive.Linq;
using System.Linq;

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
            startMenu.OnToolManageButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToToolManagerView();
                });
            startMenu.OnGroupManageButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToGroupManagerView();
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
            lentView.OnLentButtonClicked
                .Take(1)
                .Subscribe((item) =>
                {
                    item.tool.History.Add(new LentRecord()
                    {
                        Start = DateTime.Now,
                        Group = item.group,
                        End = null
                    });
                    ToolDataBase.RecordAll();

                    MoveToStartMenu();
                });
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
            var viewModel = new ReturnViewModel();
            viewModel.OnReturnButtonClicked
                .Take(1)
                .Subscribe((tool) =>
                {
                    tool.History = tool.History
                        .Select((record) =>
                        {
                            if (record.End == null)
                            {
                                record.End = DateTime.Now;
                            }
                            return record;
                        })
                        .ToList();
                    ToolDataBase.RecordAll();

                    MoveToStartMenu();
                });
            viewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToStartMenu();
                });
            Content = viewModel;
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

        public void MoveToGroupManagerView()
        {
            var viewModel = new GroupManagerViewModel();
            viewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToStartMenu();
                });
            Content = viewModel;
        }

        public void MoveToUserSettings()
        {
            Content = new UserSettingsViewModel();
        }
    }
}
