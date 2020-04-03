

using Avalonia;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Interactivity;
using Avalonia.Markup.Xaml;

using Yatsugi.Models;
using Yatsugi.ViewModels;

namespace Yatsugi.Views
{
    public class StartMenuView : UserControl
    {
        public StartMenuView()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }
    }
}