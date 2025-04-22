import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Video } from 'expo-av';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importer des icônes

const Vdeo = ({ navigation }) => { // Accepte la navigation en props
    const [videoError, setVideoError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);
    const [currentPosition, setCurrentPosition] = useState(0);

    // Liste des vidéos disponibles (à adapter)
    const videos = [
        { id: 1, title: 'Video 1', source: require('../../assets/videos/video1.mp4'), thumbnail: require('../../assets/images/numbers.png') },
        { id: 2, title: 'Video 2', source: require('../../assets/videos/video.mp4'), thumbnail: require('../../assets/images/number2.png') },
        // ... ajoute d'autres vidéos
    ];

    const retour = () => {
            router.back();
        };

    // État pour la vidéo sélectionnée
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);

    const handleVideoError = (error) => {
        console.error("Erreur de chargement de la vidéo :", error);
        setVideoError("Erreur de chargement de la vidéo.");
    };

    const handlePlayPause = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                await videoRef.current.pauseAsync();
            } else {
                await videoRef.current.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = async (direction) => {
        if (videoRef.current) {
            const status = await videoRef.current.getStatusAsync();
            const duration = status.durationMillis;
            const position = status.positionMillis;

            let newPosition = position + (direction * 5000);

            if (newPosition < 0) {
                newPosition = 0;
            } else if (newPosition > duration) {
                newPosition = duration;
            }

            await videoRef.current.setPositionAsync(newPosition);
            setCurrentPosition(newPosition);
        }
    };

    const handleSelectVideo = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false); // Mettre en pause lors du changement de vidéo
    };

    return (
        <View style={styles.container}>
             <View style={styles.header}>
                    <TouchableOpacity style={styles.btback} onPress={retour}>
                         <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                        <Text style={styles.title}>More Video</Text>
                        <View style={styles.emptyView} />
            </View>
            
            {videoError ? (
                <Text style={styles.errorText}>{videoError}</Text>
            ) : (
                <>
                    <Video
                        ref={videoRef}
                        source={selectedVideo.source}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={isPlaying}
                        useNativeControls={false}
                        style={styles.video}
                        onError={handleVideoError}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.isPlaying) {
                                setCurrentPosition(status.positionMillis);
                            }
                        }}
                        isLooping
                    />
                    <View style={styles.controls}>
                        <TouchableOpacity style={styles.controlButton} onPress={() => handleSeek(-1)}>
                            <Ionicons name="rewind" size={32} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.controlButton} onPress={handlePlayPause}>
                            <Ionicons
                                name={isPlaying ? "pause-circle" : "play-circle"}
                                size={48}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.controlButton} onPress={() => handleSeek(1)}>
                            <Ionicons name="fastforward" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <Text style={styles.subtitle}>More Videos</Text>
            <ScrollView horizontal style={styles.videoList}>
                {videos.map(video => (
                    <TouchableOpacity key={video.id} style={styles.videoItem} onPress={() => handleSelectVideo(video)}>
                        <Image source={video.thumbnail} style={styles.thumbnail} />
                        <Text style={styles.videoTitle}>{video.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
    },
    emptyView: {
        width: 44,
    },
    btback: {
        padding: 10,
    },
    video: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        overflow: 'hidden',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    controlButton: {
        marginHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#4DB6AC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 30,
        marginBottom: 10,
    },
    videoList: {
        marginTop: 10,
        padding: 20,
    },
    videoItem: {
        marginRight: 15,
        width: 100
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
        padding: 20, 
        gap : 20
    },
    videoTitle: {
        color: 'white',
        marginTop: 5,
        fontSize: 14,
    },
});

export default Vdeo;