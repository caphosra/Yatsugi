using System;
using System.Reactive.Linq;

using Avalonia.Input;
using ReactiveUI;

namespace Yatsugi.ViewModels
{
    public class StartMenuViewModel : ViewModelBase
    {
        public StartMenuViewModel()
        {
            OnMoveUserControl = ReactiveCommand.Create<StartMenuViewEvents, StartMenuViewEvents>(eventType => eventType);
        }

        private void OnLentButtonClicked()
        {
            OnMoveUserControl
                .Execute(StartMenuViewEvents.ON_LENT_BUTTON_CLICKED)
                .Subscribe();
        }

        private void OnReturnButtonClicked()
        {
            OnMoveUserControl
                .Execute(StartMenuViewEvents.ON_RETURN_BUTTON_CLICKED)
                .Subscribe();
        }

        public override void OnWindowKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.F11)
            {
                OnMoveUserControl
                    .Execute(StartMenuViewEvents.ON_SETTINGS_KEY_PUSHED)
                    .Subscribe();
            }
        }

        public ReactiveCommand<StartMenuViewEvents, StartMenuViewEvents> OnMoveUserControl { get; set; }
    }

    public enum StartMenuViewEvents
    {
        ON_LENT_BUTTON_CLICKED,
        ON_RETURN_BUTTON_CLICKED,
        ON_SETTINGS_KEY_PUSHED
    }
}
