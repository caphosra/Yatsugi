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
            viewModel.OnAddButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToAddGroup(Guid.Empty);
                });
            viewModel.OnManageButtonClicked
                .Take(1)
                .Subscribe((guid) =>
                {
                    MoveToAddGroup(guid);
                });
            viewModel.OnQRCodeButtonClicked
                .Take(1)
                .Subscribe(OnGenerateQRCodeButtonClicked);
            viewModel.OnBackButtonClicked
                .Take(1)
                .InvokeCommand(OnBackButtonClicked);
            Content = viewModel;
        }

        public void MoveToAddGroup(Guid id)
        {
            var viewModel = new AddGroupViewModel(id);
            viewModel.OnSaveButtonClicked
                .Take(1)
                .Subscribe((group) =>
                {
                    ToolDataBase.Groups = ToolDataBase.Groups
                        .Where((item) => item.ID != group.ID)
                        .ToList();
                    ToolDataBase.Groups.Add(group);
                    ToolDataBase.RecordAll();

                    MoveToGroupList();
                });
            viewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToGroupList();
                });
            Content = viewModel;
        }

        public async void OnGenerateQRCodeButtonClicked(Guid id)
        {
            var group = ToolDataBase.Groups
                .Single((group) => group.ID == id);

            var dialog = new SaveFileDialog();
            dialog.InitialFileName = $"{group.Name}-QRCode.jpg";
            dialog.Directory = Environment.GetFolderPath(Environment.SpecialFolder.MyPictures);
            var path = await dialog.ShowAsync((App.Current as App).Window);

            if (path != null)
            {
                var qrGenerator = new QRCodeGenerator();
                var qrCodeData = qrGenerator.CreateQrCode("The text which should be encoded.", QRCodeGenerator.ECCLevel.Q);
                var qrCode = new QRCode(qrCodeData);
                var qrCodeImage = qrCode.GetGraphic(20);
                qrCodeImage.Save(path, ImageFormat.Jpeg);
            }

            MoveToGroupList();
        }
    }
}