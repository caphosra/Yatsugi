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
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class ToolManagerViewModel : ViewModelBase
    {
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        private ViewModelBase content;
        public ViewModelBase Content
        {
            get => content;
            private set => this.RaiseAndSetIfChanged(ref content, value);
        }

        public ToolManagerViewModel()
        {
            OnBackButtonClicked = ReactiveCommand.Create(() => { });
            MoveToToolList();
        }

        public void MoveToToolList()
        {
            var viewModel = new ToolListViewModel();
            viewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    OnBackButtonClicked
                        .Execute()
                        .Subscribe();
                });
            Content = viewModel;
        }
    }
}
