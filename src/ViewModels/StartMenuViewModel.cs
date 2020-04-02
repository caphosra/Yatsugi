using System;
using System.Collections.Generic;
using System.IO;
using System.Reactive;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;

using Avalonia.Input;
using ReactiveUI;

using Yatsugi.Models;

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

        private void OnKeyDown(object sender, KeyEventArgs e)
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
