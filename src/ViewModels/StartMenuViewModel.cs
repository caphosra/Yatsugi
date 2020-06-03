using System;
using System.Reactive;
using System.Reactive.Linq;

using Avalonia.Input;
using ReactiveUI;

namespace Yatsugi.ViewModels
{
    public class StartMenuViewModel : ViewModelBase
    {
        public ReactiveCommand<Unit, Unit> OnLentButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnReturnButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnToolManageButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnGroupManageButtonClicked { get; set; }
        public ReactiveCommand<Unit, Unit> OnSettingKeyDown { get; set; }

        public StartMenuViewModel()
        {
            OnLentButtonClicked = ReactiveCommand.Create(() => { });
            OnReturnButtonClicked = ReactiveCommand.Create(() => { });
            OnToolManageButtonClicked = ReactiveCommand.Create(() => { });
            OnGroupManageButtonClicked = ReactiveCommand.Create(() => { });
            OnSettingKeyDown = ReactiveCommand.Create(() => { });
        }

        public override void OnWindowKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.F11)
            {
                OnSettingKeyDown
                    .Execute()
                    .Subscribe();
            }
        }
    }
}
