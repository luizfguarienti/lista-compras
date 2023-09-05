import { Text, View, TextInput, TouchableOpacity, Alert, FlatList} from "react-native";
import { styles } from './styles';

import { Product } from "../../components/Product";
import { useState } from "react";


export default function Home() {

    const [products, setProducts] = useState<String[]>([]);
    const [productName, setProductName] = useState('');

    function headleProductAdd () {
        if (productName.trim().length > 0) {

            if (products.includes(productName)) {   
                setProductName('');
                return Alert.alert("Problema", 'Produto já existe.');
            }

            setProducts([...products, productName]);
            setProductName('');
        } else {
            Alert.alert("Problema ao adicionar produto", "Nome está vazio.");
        }
    }

    function handleProductsRemove(name: String) {
        Alert.alert('Remover', `Deseja remover o produto ${name} ?`,
        [
            {
                text: 'Sim',
                onPress : () =>
                    setProducts(prevState => prevState.filter(partic => partic != name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de compras</Text>
            <Text style={styles.date}>Quarta, 23 de agosto de 2023.</Text>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder='Nome do produto'
                    placeholderTextColor={'grey'}
                    onChangeText={text => setProductName(text)} 
                    value={productName}
                />    
            </View>
            <View style={styles.formButtonAdicionar}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={headleProductAdd}>

                    <Text style={styles.textButton}>ADICIONAR</Text>
                </TouchableOpacity> 
            </View>

                <Text style={styles.title}>Produtos</Text>
                <FlatList
                    data={products}
                    keyExtractor={item => item}
                    renderItem={ ({item}) => (
                        <Product key={item} 
                                     name={item}
                                     onRemove={() => handleProductsRemove(item)}/>
                    )}
                    
                    showsVerticalScrollIndicator = {false}
                        
                    ListEmptyComponent={() => (
                        <Text style={styles.listEmpty}>Não existe produto na sua lista de compras </Text>
                    )}
                />
        </View>
    )
        
    
}

