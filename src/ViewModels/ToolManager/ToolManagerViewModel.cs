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
            viewModel.OnAddButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToAddTool(Guid.Empty);
                });
            viewModel.OnManageButtonClicked
                .Take(1)
                .Subscribe((guid) =>
                {
                    MoveToAddTool(guid);
                });
            viewModel.OnHistoryButtonClicked
                .Take(1)
                .Subscribe((guid) =>
                {
                    MoveToHistory(guid);
                });
            viewModel.OnQRCodeButtonClicked
                .Take(1)
                .Subscribe(OnGenerateQRCodeButtonClicked);
            viewModel.OnDeleteButtonClicked
                .Take(1)
                .Subscribe(async (guid) =>
                {
                    var msBoxStandardWindow = MessageBoxManager.GetMessageBoxStandardWindow(new MessageBoxStandardParams
                    {
                        ButtonDefinitions = ButtonEnum.OkCancel,
                        ContentTitle = "器材の削除",
                        ContentMessage = "本当に削除しますか? この操作を取り消すことは出来ませんよ! 開発者は責任取らないからね!!!",
                        Icon = Icon.Warning,
                        Style = Style.MacOs
                    });
                    var result = await msBoxStandardWindow.ShowDialog((App.Current as App).Window);

                    if (result == ButtonResult.Ok)
                    {
                        ToolDataBase.DeleteTool(guid, throwWhenNotExists: true);
                        ToolDataBase.RecordAll();
                    }

                    MoveToToolList();
                });
            viewModel.OnBackButtonClicked
                .Take(1)
                .InvokeCommand(OnBackButtonClicked);
            Content = viewModel;
        }

        public void MoveToAddTool(Guid id)
        {
            var viewModel = new AddToolViewModel(id);
            viewModel.OnSaveButtonClicked
                .Take(1)
                .Subscribe((tool) =>
                {
                    ToolDataBase.DeleteTool(tool.ID, throwWhenNotExists: false);
                    ToolDataBase.Tools.Add(tool);
                    ToolDataBase.RecordAll();

                    MoveToToolList();
                });
            viewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToToolList();
                });
            Content = viewModel;
        }

        public void MoveToHistory(Guid id)
        {
            var viewModel = new HistoryViewModel(id);
            viewModel.OnBackButtonClicked
                .Take(1)
                .Subscribe((unit) =>
                {
                    MoveToToolList();
                });
            Content = viewModel;
        }

        public async void OnGenerateQRCodeButtonClicked(Guid id)
        {
            var tool = ToolDataBase.Tools
                .Single((tool) => tool.ID == id);

            var dialog = new SaveFileDialog();
            dialog.InitialFileName = $"{tool.Name}-QRCode.jpg";
            dialog.Directory = Environment.GetFolderPath(Environment.SpecialFolder.MyPictures);
            var path = await dialog.ShowAsync((App.Current as App).Window);

            if (path != null)
            {
                var qrGenerator = new QRCodeGenerator();
                var qrCodeData = qrGenerator.CreateQrCode(id.ToString(), QRCodeGenerator.ECCLevel.Q);
                var qrCode = new QRCode(qrCodeData);
                var qrCodeImage = qrCode.GetGraphic(20);
                qrCodeImage.Save(path, ImageFormat.Jpeg);
            }

            MoveToToolList();
        }
    }
}
