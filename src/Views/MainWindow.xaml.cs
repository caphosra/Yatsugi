using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Markup.Xaml;

using Yatsugi.ViewModels;

namespace Yatsugi.Views
{
    public class MainWindow : Window
    {
        public MainWindowViewModel ViewModel => DataContext as MainWindowViewModel;

        public MainWindow()
        {
            InitializeComponent();
            KeyDown += OnWindowKeyDown;
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }

        public void OnWindowOpened()
        {
            ViewModel.OnWindowOpened(this);
        }

        private void OnWindowKeyDown(object sender, KeyEventArgs e)
        {
            var userControlViewModel = ViewModel.Content as ViewModelBase;
            userControlViewModel?.OnWindowKeyDown(sender, e);
        }
    }
}