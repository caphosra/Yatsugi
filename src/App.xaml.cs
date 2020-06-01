using Avalonia;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Markup.Xaml;
using Yatsugi.ViewModels;
using Yatsugi.Views;

namespace Yatsugi
{
    public class App : Application
    {
        public MainWindow Window { get; private set; }

        public override void Initialize()
        {
            AvaloniaXamlLoader.Load(this);
        }

        public override void OnFrameworkInitializationCompleted()
        {
            if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
            {
                var mainWindow = new MainWindow {
                    DataContext = new MainWindowViewModel()
                };
                desktop.MainWindow = mainWindow;
                Window = mainWindow;
            }

            base.OnFrameworkInitializationCompleted();
        }
    }
}