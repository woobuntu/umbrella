import { useEffect } from "react";
import ChannelService from "ChannelService";

export default function useChannelTalk() {
  useEffect(() => {
    ChannelService.boot({
      pluginKey: process.env.REACT_APP_CHANNEL_PLUGIN_KEY,
    });
    return () => {
      ChannelService.shutdown();
    };
  }, []);
}
