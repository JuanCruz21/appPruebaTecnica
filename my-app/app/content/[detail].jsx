import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, ScrollView,View,Button,TouchableOpacity, ActivityIndicator } from 'react-native';
import { showContent } from '../../core/content/actions/content-actions';
import { content } from '../../core/content/interfaces/content';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import {Ionicons} from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';

export default function Detail() {
  const [videoSource, setVideoSource] = useState(null);
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(content);
  const [isLoading,setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState();

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    try {
      const response = await showContent(id);
      // const video = await axios.get('http://127.0.0.1:8000'+response.urldata);
      setData(response);
      if (response?.urldata && getFileType(response.urldata) === 'mp4') {
        setVideoSource(response.urldata.startsWith('http') ? response.urldata : 'http://127.0.0.1:8000'+response.urldata);
        // setVideoSource('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };
  const getFileType = (url) => {
    return url?.split('.').pop().toLowerCase();
  };
  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    player.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  console.log('Informacion util',player)
  if (!data) {
    return (
      <View style={style.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  const dowloadDocument = async () =>{
    try{
      setIsLoading(true);
      setDownloadProgress(0);
      const fileName = data?.urldata.split('/').pop();
      const uri =data?.urldata.startsWith('http')?
      data?.urldata
      :'http://127.0.0.1:8000'+data?.urldata;
      const result = await FileSystem.downloadAsync(
        uri,
        FileSystem.documentDirectory + fileName
      );
      const downloadResumable = FileSystem.createDownloadResumable(
        uri,
        FileSystem.documentDirectory + fileName,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );
      const resulta = await downloadResumable.downloadAsync();
    console.log('Documento descargado en:', result.uri);
    save(result.uri);
    setIsLoading(false);
    } catch (error){
      console.error(error)
      setIsLoading(false);
    }
  }
  const save = (uri) => {
    shareAsync(uri);
    setIsLoading(false);
  }

  const fileType = getFileType(data?.urldata);
  console.log(videoSource);
  return (
    <ScrollView style={style.container} contentContainerStyle={style.contentContainer}>
      <Text style={style.title}>{data?.title}</Text>
      {/* <Text style={style.title}>{videoSource}</Text> */}
      {fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg' ? (
        <Image
        source={{ uri: 'http://127.0.0.1:8000' + data?.urldata }}
        style={style.image}
      />
      ):fileType === 'mp4' || fileType === 'mov' ? (
      <View style={style.contentContainer}>
              <VideoView style={style.video} player={player} allowsFullscreen allowsPictureInPicture />
              {/* <View style={style.controlsContainer}>
                <Button
                  title={isPlaying ? 'Pause' : 'Play'}
                  onPress={() => {
                    if (isPlaying) {
                      player.pause();
                    } else {
                      player.play();
                    }
                  }}
                />
              </View> */}
            </View>
      ): (
        <Text style={style.unsupported}>Unsupported file type</Text>
      )}
      {downloadProgress === NaN ? null
      :<Text style={style.percentage}>
        {Math.round(downloadProgress * 100)}%
      </Text>}
      <Text style={style.description}>{data?.description}</Text>\
      <TouchableOpacity style={style.TouchableOpacity} onPress={dowloadDocument}>
        <Text style={style.Text}>Descargar archivo</Text>
        <Ionicons name="cloud-download" size={24} color="white" />
        {isLoading ?? <ActivityIndicator style={{marginHorizontal:20}} size="small" color="#fff" animating={isLoading} />}
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center', // Mueve el alignItems aquí
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '90%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    margin: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  video: {
    width: 400,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  TouchableOpacity:{
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 20,
  },
  Text:{
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  unsupported: {
    textAlign: 'center',
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  });