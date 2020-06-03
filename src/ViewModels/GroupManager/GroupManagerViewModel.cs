using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Reactive;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Input;
using MessageBox.Avalonia;
using MessageBox.Avalonia.DTO;
using MessageBox.Avalonia.Enums;
using ReactiveUI;
using QRCoder;

using Yatsugi.Models;
using Yatsugi.Models.DataTypes;

namespace Yatsugi.ViewModels
{
    public class GroupManagerViewModel : ViewModelBase
    {
        public ReactiveCommand<Unit, Unit> OnBackButtonClicked { get; set; }

        private ViewModelBase content;
        public ViewModelBase Content
        {
            get => content;
            private set => this.RaiseAndSetIfChanged(ref content, value);
        }

        public GroupManagerViewModel()
        {
            OnBackButtonClicked = ReactiveCommand.Create(() => { });
            MoveToGroupList();
        }

        public void MoveToGroupList()
        {
            var viewModel = new GroupListViewModel();
            Content = viewModel;
        }
    }
}
