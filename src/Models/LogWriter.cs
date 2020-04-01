#if !YATSUGI_DISABLE_LOG
#define YATSUGI_ENABLE_LOG
#else
#undef YATSUGI_ENABLE_LOG
#warning Logging is now disabled.
#endif

using System;
using System.IO;
using System.Diagnostics;

using Yatsugi.Models.DataTypes;

namespace Yatsugi.Models
{
    public static class LogWriter
    {
        public static bool DoLog { get; set; } = true;

        private static StreamWriter Logger { get; set; }

        private const string LOG_FILE_NAME = "yatsugi.log";

        public static string LogFilePath
            => Path.Combine(
                UserSettings.DataDirectory,
                LOG_FILE_NAME
            );

        public static void Write(string text, bool isError = false)
        {
            #if YATSUGI_ENABLE_LOG

            if (DoLog)
            {
                if (Logger == null)
                {
                    Directory.CreateDirectory(UserSettings.DataDirectory);
                    Logger = new StreamWriter(LogFilePath, false);
                }

                Logger.WriteLine($"[{(isError ? "ERROR" : "LOG")} {DateTime.Now}] {text}");
            }

            #endif
        }

        public static void Close()
        {
            Logger?.Close();
        }
    }
}
